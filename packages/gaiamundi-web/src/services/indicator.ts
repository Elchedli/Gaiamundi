import { Indicator, IndicatorStub } from 'interfaces/indicator';
import { ContentType, strapi } from './strapi';

export const getIndicatorsByPageCarto = async (pageCartoId: number) => {
  return await strapi.get<Indicator>(ContentType.INDICATOR, {
    filters: {
      page_carto: { $eq: pageCartoId },
    },
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
