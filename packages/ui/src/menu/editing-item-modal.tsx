import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  ImageProps,
  Input,
  Modal,
  NumberInput,
  PolymorphicComponentProps,
  Switch,
  Text,
  Textarea,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconPhotoOff, IconSearch, IconUpload, IconX } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef, useState } from 'react';

import { assertLength, mantineCssVar } from '../util';
import { useEditingTreeContext } from './stores/menu-editing-store';

const ImgFromFile = observer<
  {
    src: File | string;
  } & Omit<PolymorphicComponentProps<`img`, ImageProps>, `src`>
>(function ImgFromFile({ src, onLoad, ...props }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof src === `string`) {
      setUrl(src);
      return undefined;
    } else {
      const url = URL.createObjectURL(src);
      setUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [src]);

  return (
    <Image
      {...props}
      fit={'contain'}
      src={url}
      onLoad={e => {
        try {
          return onLoad?.(e);
        } finally {
          if (url && typeof src !== `string`) {
            URL.revokeObjectURL(url);
          }
        }
      }}
    />
  );
});

const UploadWithPreview = observer<{
  imageId: string | undefined | null;
  onUpload: (file: File | null) => void;
}>(function UploadWithPreview({ imageId, onUpload }) {
  const ctx = useEditingTreeContext();
  const { src, fileName } = useMemo(() => {
    if (!imageId) {
      return {};
    }
    {
      const fileToUpload = ctx.treeState.editing?.fileToUpload;
      if (fileToUpload && fileToUpload.id === imageId) {
        return { src: fileToUpload.file, fileName: fileToUpload.file.name };
      }
    }
    {
      const fileToUpload = ctx.menu.filesToUpload.get(imageId)?.file;
      if (fileToUpload) {
        return { src: fileToUpload, fileName: fileToUpload.name };
      }
    }
    {
      const img = ctx.menu.origImageById(imageId);
      return { src: img.url, fileName: img.originalName };
    }
  }, [ctx, imageId]);

  const openRef = useRef<() => void>(null);
  return (
    <Flex direction="column">
      <Dropzone
        multiple={false}
        onDrop={files => onUpload(assertLength(files, 1)[0])}
        onReject={files => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        activateOnClick={false}
        openRef={openRef}
      >
        <Flex direction="column" gap={8}>
          <Flex align={'center'} gap={8}>
            <Box style={{ flex: `1 0 0` }}>
              <AspectRatio ratio={16 / 9} style={{ border: `1px solid #222`, borderRadius: 4 }}>
                {src ? (
                  <ImgFromFile src={src} />
                ) : (
                  <Center>
                    <IconPhotoOff></IconPhotoOff>
                  </Center>
                )}
              </AspectRatio>
            </Box>
            <Flex direction="column" align="end" justify="center" style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size={42} color="var(--mantine-color-blue-6)" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={42} color="var(--mantine-color-red-6)" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={42} color="var(--mantine-color-dimmed)" stroke={1.5} />
              </Dropzone.Idle>

              {/*<div>*/}
              <Text size="sm" style={{ textAlign: `right` }}>
                Drag
                <br />
                or
              </Text>
              {/*  <Text size="sm" c="dimmed" inline mt={7}>*/}
              {/*    Attach as many files as you like, each file should not exceed 5mb*/}
              {/*  </Text>*/}
              {/*</div>*/}
              <Button variant="light" onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
                Select
              </Button>
            </Flex>
          </Flex>
          <Flex
            align="center"
            gap={8}
            style={{ borderRadius: 4, border: `1px solid`, borderColor: mantineCssVar(`gray`, 4) }}
            px={`xs`}
            py={4}
          >
            <Box
              flex="1 0 0"
              style={{
                whiteSpace: `nowrap`,
                textOverflow: `ellipsis`,
                overflow: `hidden`,
                ...(fileName == null && {
                  fontStyle: `italic`,
                  color: mantineCssVar(`gray`, 5),
                }),
              }}
            >
              {fileName ?? `<empty>`}
            </Box>
            <ActionIcon
              size={`sm`}
              variant={`transparent`}
              onClick={() => openRef.current?.()}
              style={{ pointerEvents: 'all' }}
            >
              <IconSearch />
            </ActionIcon>
            <ActionIcon
              size={`xs`}
              radius={`lg`}
              onClick={() => onUpload(null)}
              style={{ pointerEvents: 'all' }}
            >
              <IconX />
            </ActionIcon>
          </Flex>
        </Flex>
      </Dropzone>
    </Flex>
  );
});

export const EditingItemModal = observer(function EditingItemModal() {
  const editCtx = useEditingTreeContext();
  const { treeState } = editCtx;
  const { editing } = treeState;

  return (
    <Modal opened={!!editing} onClose={() => treeState.setEditing(null)}>
      <Flex direction="column" gap={16}>
        <Input.Wrapper label="Title">
          {editing && (
            <Input
              value={editing.changes.title || editing.original?.title || ''}
              onChange={e => editing.update({ title: e.target.value })}
            />
          )}
        </Input.Wrapper>
        <Input.Wrapper label="Description">
          {editing && (
            <Textarea
              value={editing.changes.description || editing.original?.description || ''}
              onChange={e => editing.update({ description: e.target.value })}
            />
          )}
        </Input.Wrapper>
        <Input.Wrapper label="Price">
          {editing && (
            <Flex gap={16} align="center">
              <NumberInput
                disabled={(editing.changes.price ?? editing.original?.price) == null}
                value={editing.changes.price ?? (editing.original?.price || '-')}
                onChange={value => editing.update({ price: value })}
              />
              <Switch
                label="No price"
                checked={(editing.changes.price ?? editing.original?.price) == null}
                onChange={e => editing.update({ price: e.currentTarget.checked ? null : 0 })}
              />
            </Flex>
          )}
        </Input.Wrapper>

        <UploadWithPreview
          imageId={
            editing?.changes.imageId !== undefined ? editing.changes.imageId : editing?.original?.imageId
          }
          onUpload={e => {
            if (!editing) {
              return;
            }
            editing.setFileToUpload(e);
            editing.update({ imageId: editing.fileToUpload?.id ?? null });
          }}
        />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            onClick={() => {
              if (treeState.editing) {
                treeState.editing.save();
                treeState.setEditing(null);
              }
            }}
          >
            Save
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
});
