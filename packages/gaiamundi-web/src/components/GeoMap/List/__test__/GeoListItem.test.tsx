import { render } from '@testing-library/react';
import GeoListItem from 'components/GeoMap/List/GeoListItem';
import config from 'config';
import { mockGeoMapData } from 'utils/mocks/data';

describe('GeoListItem', () => {
  it('should render the name of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(getByText(mockGeoMapData.attributes.name)).toBeInTheDocument();
  });

  it('should render the source of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(`Source : ${mockGeoMapData.attributes.source}`)
    ).toBeInTheDocument();
  });

  it('should render the license of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(`License : ${mockGeoMapData.attributes.license}`)
    ).toBeInTheDocument();
  });

  it('should render the year validity of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(
        `Annee de validitée : ${mockGeoMapData.attributes.yearValidity}`
      )
    ).toBeInTheDocument();
  });

  it('should render an image with the correct src', () => {
    const { getByRole } = render(<GeoListItem {...mockGeoMapData} />);
    const imgElement = getByRole('img');
    expect(imgElement).toHaveAttribute(
      'src',
      `${config.API_URL}/api/geo-maps/thumbnail/1`
    );
  });
});
