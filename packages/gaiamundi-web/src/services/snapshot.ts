import { Snapshot, SnapshotStub } from 'interfaces/snapshot';
import { ContentType, strapi } from './strapi';

export const createSnapshot = async (data: SnapshotStub) => {
  return await strapi.create<SnapshotStub>(ContentType.SNAPSHOTS, data);
};

export const getSnapshotById = async (id: number) => {
  return await strapi.getById<Snapshot>(ContentType.SNAPSHOTS, id);
};
