import { DBSchema, openDB } from 'idb';
import { SnapshotInOf } from 'mobx-keystone';

import { LocalPreferences } from './local-preferences';

interface MyDB extends DBSchema {
  localPreferences: {
    key: string;
    value: {
      userId: string;
      json: SnapshotInOf<LocalPreferences>;
    };
    indexes: {
      'by-user': string;
    };
  };
  // Хранилище “snapshots”: для каждого userId и key своя запись
  snapshots: {
    key: [string, string]; // [userId, key]
    value: {
      userId: string; // идентификатор пользователя
      key: string; // ваш произвольный ключ-снимок
      json: string; // сериализованное состояние
      createdAt: number; // метка времени
    };
    indexes: {
      'by-user': string; // имя индекса → тип поля, по которому индексируем
    };
  };
}

export const dbPromise = openDB<MyDB>('focalm-app-db', 1, {
  upgrade(db) {
    {
      const store = db.createObjectStore('snapshots', {
        keyPath: ['userId', 'key'],
      });
      store.createIndex('by-user', 'userId');
    }

    {
      const store = db.createObjectStore('localPreferences', {
        keyPath: 'userId',
      });
      store.createIndex('by-user', 'userId');
    }
  },
});
