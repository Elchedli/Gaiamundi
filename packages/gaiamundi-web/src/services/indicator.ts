import { Indicator, IndicatorStub } from 'interfaces/indicator';
import { ContentType, strapi } from './strapi';

export const getIndicatorsByPageCarto = async (pageCartoId: number) => {
  return await strapi.get<Indicator>(ContentType.INDICATOR, {
    filters: {
      page_carto: { $eq: pageCartoId },
    },
    populate: 'variables',
  });
};

export const addIndicatorToPageCarto = async (
  pageCartoId: number,
  indicator: IndicatorStub
) => {
  return await strapi.create<IndicatorStub>(ContentType.INDICATOR, {
    ...indicator,
    page_carto: pageCartoId,
  });
};
export const updateIndicatorToPageCarto = async (
  indicatorId: number,
  updatedData: IndicatorStub
) => {
  return await strapi.update<{ data: IndicatorStub }, IndicatorStub>(
    ContentType.INDICATOR,
    indicatorId,
    { data: updatedData }
  );
};

export const deleteIndicatorToPageCarto = async (indicatorId: number) => {
  return await strapi.delete<IndicatorStub>(ContentType.INDICATOR, indicatorId);
};

export const getOneIndicatorByPageCarto = async (
  idIndicator: number,
  pageCartoId: number
) => {
  return await strapi.getById<Indicator>(ContentType.INDICATOR, idIndicator, {
    filters: {
      page_carto: { $eq: pageCartoId },
    },
    populate: 'variables',
  });
};
