# poslah

Default services targets:

"clean-dist": {},
"copy-assets": {},
"build-service": {},
"run-service": {},
"serve-backend": {},
"issue-service-cert": {},
"generate-proto-code": {
  "options": {
    "protoFileName": "<name>"
  }
},







graph TD
subgraph Client
A[Client App]
end

    subgraph chats-service
        B[API: pushEventOptimistic]
        C[Stream Consumer: handleRawEventCreate]
        D[Service: saveEvent]
        E[gRPC Server: ChatsService]
    end

    subgraph messages-service
        F[Stream Consumer: onMessageCreated]
        G[Stream Consumer: onMessagePatched]
        H[Service: createMessage]
        I[Service: patchMessage]
        J[gRPC Client: ChatsGRPCClient]
    end
    
    subgraph subscriptions-service
        K[Stream Consumer: handleMessageProjection]
        L[Pub/Sub Consumer: membershipSubscription]
        M[gRPC Client: ChatsGRPCClient]
    end

    subgraph Redis
        R1[Stream: events.raw.create]
        R2[Stream: events.message.created]
        R3[Stream: events.message.patched]
        R4[Stream: projection.message.created]
        R5[Stream: projection.message.patched]
        R6[Pub/Sub: user.membership]
    end

    %% Flow
    A -- HTTP POST --> B;
    B -- Publishes to --> R1;

    R1 -- Consumed by --> C;
    C -- Calls --> D;
    D -- Publishes to --> R2;
    D -- Publishes to --> R3;
    D -- Publishes to --> R6;

    R2 -- Consumed by --> F;
    F -- Calls --> H;
    H -- Publishes to --> R4;

    R3 -- Consumed by --> G;
    G -- Calls --> I;
    I -- Publishes to --> R5;
    I -- gRPC Call --> J;
    J -- Calls --> E;

    R4 -- Consumed by --> K;
    R5 -- Consumed by --> K;

    R6 -- Consumed by --> L;
    L -- gRPC Call --> M;
    M -- Calls --> E;

    %% Styling
    classDef service fill:#f9f,stroke:#333,stroke-width:2px;
    class chats-service,messages-service,subscriptions-service service;
    classDef redis fill:#add8e6,stroke:#333,stroke-width:2px;
    class R1,R2,R3,R4,R5,R6 redis;
