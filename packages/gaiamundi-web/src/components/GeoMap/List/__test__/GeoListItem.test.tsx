import { render } from '@testing-library/react';
import { GeoListItem } from 'components/GeoMap/List/GeoListItem';
import config from 'config';
import { mockGeoMapData } from 'utils/mocks/data';

describe('GeoListItem', () => {
  it('should render the perimeter of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(getByText(mockGeoMapData.name)).toBeInTheDocument();
  });

  it('should render the source of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(getByText(`Source : ${mockGeoMapData.source}`)).toBeInTheDocument();
  });

  it('should render the license of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(`License : ${mockGeoMapData.license}`)
    ).toBeInTheDocument();
  });

  it('should render the year validity of the GeoMap', () => {
    const { getByText } = render(<GeoListItem {...mockGeoMapData} />);
    expect(
      getByText(`Annee de validitée : ${mockGeoMapData.yearValidity}`)
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
