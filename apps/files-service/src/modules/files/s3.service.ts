import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { once } from '@gurban/kit/core/once'; // Your custom logger
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(
    private readonly loggerBase: Logger,
    private readonly configService: ConfigService
  ) {
    this.bucket = this.configService.getOrThrow<string>('S3_BUCKET');

    this.s3Client = new S3Client({
      endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow<string>('S3_SECRET_KEY'),
      },
      region: this.configService.getOrThrow<string>('S3_REGION'),
      forcePathStyle: true,
    });
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, S3Service.name);
  }

  /**
   * Initiates a new multipart upload session with S3.
   * @param key The unique key (UUID-based filename) for the new object.
   * @param mimeType The MIME type of the file.
   * @returns The `UploadId` for the new session.
   */
  async createMultipartUpload(key: string, mimeType: string): Promise<string> {
    const command = new CreateMultipartUploadCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: mimeType,
    });
    const response = await this.s3Client.send(command);
    if (!response.UploadId) {
      throw new Error('Failed to create multipart upload session.');
    }
    this.logger.info(`Initiated multipart upload for key ${key} with UploadId ${response.UploadId}`);
    return response.UploadId;
  }

  /**
   * Generates a pre-signed URL for uploading a single part (chunk).
   * Includes the checksum for the part to be verified by S3.
   * @param key The object key.
   * @param uploadId The active session ID.
   * @param partNumber The number of the chunk (1-based).
   * @param checksumSha256 The SHA256 hash of the chunk's content.
   * @returns A pre-signed URL for a PUT request.
   */
  async getSignedUrlForPart(
    key: string,
    uploadId: string,
    partNumber: number,
    checksumSha256: string
  ): Promise<string> {
    const command = new UploadPartCommand({
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      ChecksumSHA256: checksumSha256, // S3 will verify this on upload
    });
    // The URL is valid for 1 hour by default. This can be configured.
    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  /**
   * Finalizes the multipart upload by assembling all uploaded parts.
   * Includes the checksum for the *entire file* to be verified by S3.
   * @param key The object key.
   * @param uploadId The active session ID.
   * @param parts An array of `{ ETag, PartNumber }` for each uploaded chunk.
   * @param totalFileChecksum The SHA256 hash of the complete file.
   * @returns The final object metadata from S3.
   */
  async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: { ETag: string; PartNumber: number }[],
    totalFileChecksum: string
  ) {
    const command = new CompleteMultipartUploadCommand({
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
      ChecksumSHA256: totalFileChecksum, // S3 will verify the final assembled file
    });
    return this.s3Client.send(command);
  }

  /**
   * Aborts a multipart upload, deleting any uploaded parts from storage.
   * @param key The object key.
   * @param uploadId The active session ID to abort.
   */
  async abortMultipartUpload(key: string, uploadId: string): Promise<void> {
    const command = new AbortMultipartUploadCommand({
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
    });
    await this.s3Client.send(command);
    this.logger.warn(`Aborted multipart upload for key ${key} with UploadId ${uploadId}`);
  }
}
