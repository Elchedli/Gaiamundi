import { PageCarto } from 'interfaces/pageCarto';
import { useState } from 'react';
import {
  getPageCarto,
  deletePageCarto as deletePage,
  updatePageCarto as updatePage,
  createPageCarto as createPage,
} from 'services/page-carto';

/**
 * A hook to perform CRUD operations on the map entity
 * @returns
 */

export const usePageCarto = () => {
  const [pageCartos, setPagesCartos] = useState<
    { id: number; attributes: PageCarto }[] | undefined
  >(undefined);

  const getPageCartos = async (query?: object | number) => {
    const { data } = await getPageCarto(query);
    setPagesCartos(data);
  };

  const deletePageCarto = async (id: number) => {
    return await deletePage(id);
  };

  const updatePageCarto = async (id: number, data: Partial<PageCarto>) => {
    return await updatePage(id, data);
  };

  const createPageCarte = async (data: PageCarto) => {
    return await createPage(data);
  };

  return {
    pageCartos,
    getPageCartos,
    deletePageCarto,
    updatePageCarto,
    createPageCarte,
  };
};
