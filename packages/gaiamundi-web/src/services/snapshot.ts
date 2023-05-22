import { SnapshotStub } from 'interfaces/snapshot';
import { ContentType, strapi } from './strapi';

export const createSnapshot = async (data: SnapshotStub) => {
  return await strapi.create<SnapshotStub>(ContentType.SNAPSHOTS, data);
};
