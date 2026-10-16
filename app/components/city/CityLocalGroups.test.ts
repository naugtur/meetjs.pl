import { renderSuspended } from '@nuxt/test-utils/runtime';
import { cleanup, screen } from '@testing-library/vue';
import { afterEach, describe, expect, it } from 'vitest';
import CityLocalGroups from './CityLocalGroups.vue';

const renderGroups = (localGroups?: string[]) =>
  renderSuspended(CityLocalGroups, { props: { localGroups } });

describe('CityLocalGroups', () => {
  afterEach(() => cleanup());

  it("doesn't render without local groups", async () => {
    await renderGroups();
    expect(screen.queryByText(/Join our local groups/i)).toBeNull();
  });

  it("doesn't render with an empty list", async () => {
    await renderGroups([]);
    expect(screen.queryByText(/Join our local groups/i)).toBeNull();
  });

  it.each([
    ['https://meetup.com/xyz', 'Meetup group'],
    ['https://lu.ma/xyz', 'Luma group'],
    ['https://facebook.com/xyz', 'Facebook group'],
    ['https://crossweb.pl/xyz', 'Crossweb group'],
    ['https://github.com/xyz', 'Github group'],
  ])('renders %s as "%s"', async (link, label) => {
    await renderGroups([link]);
    expect(screen.getByText(/Join our local groups/i)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: new RegExp(label, 'i') }),
    ).toHaveAttribute('href', link);
  });

  it('renders the links in the given order', async () => {
    const links = [
      'https://meetup.com/xyz',
      'https://lu.ma/xyz',
      'https://facebook.com/xyz',
    ];
    await renderGroups(links);

    const renderedLinks = screen.getAllByRole('link');
    expect(renderedLinks).toHaveLength(links.length);
    links.forEach((link, index) => {
      expect(renderedLinks[index]).toHaveAttribute('href', link);
    });
  });
});
