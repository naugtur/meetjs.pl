import { render, screen } from '@testing-library/react';
import React from 'react';
import { LocalGroups } from './LocalGroups';

describe('LocalGroups', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("don't show component without local groups", () => {
    render(<LocalGroups />);
    expect(screen.queryByText(/Join our local groups/i)).toBeNull();
  });

  it("don't show component with empty array", () => {
    render(<LocalGroups localGroups={[]} />);
    expect(screen.queryByText(/Join our local groups/i)).toBeNull();
  });

  it('renders component with Meetup icon', () => {
    const link = 'https://meetup.com/xyz';
    render(<LocalGroups localGroups={[link]} />);
    expect(screen.queryByText(/Join our local groups/i)).toBeInTheDocument();
    expect(screen.getByText('Meetup group')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Meetup group/i })).toHaveAttribute(
      'href',
      link,
    );
  });

  it('renders component with Luma icon', () => {
    const link = 'https://lu.ma/xyz';
    render(<LocalGroups localGroups={[link]} />);
    expect(screen.queryByText(/Join our local groups/i)).toBeInTheDocument();
    expect(screen.getByText('Luma group')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Luma group/i })).toHaveAttribute(
      'href',
      link,
    );
  });

  it('renders component with Facebook icon', () => {
    const link = 'https://facebook.com/xyz';
    render(<LocalGroups localGroups={[link]} />);
    expect(screen.queryByText(/Join our local groups/i)).toBeInTheDocument();
    expect(screen.getByText('Facebook group')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Facebook group/i }),
    ).toHaveAttribute('href', link);
  });

  it('renders component with Crossweb icon', () => {
    const link = 'https://crossweb.pl/xyz';
    render(<LocalGroups localGroups={[link]} />);
    expect(screen.queryByText(/Join our local groups/i)).toBeInTheDocument();
    expect(screen.getByText('Crossweb group')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Crossweb group/i }),
    ).toHaveAttribute('href', link);
  });

  it('renders component with Github icon', () => {
    const link = 'https://github.com/xyz';
    render(<LocalGroups localGroups={[link]} />);
    expect(screen.queryByText(/Join our local groups/i)).toBeInTheDocument();
    expect(screen.getByText('Github group')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Github group/i })).toHaveAttribute(
      'href',
      link,
    );
  });

  it('renders correct number of links in the same order as provided', () => {
    const links = [
      'https://meetup.com/xyz',
      'https://lu.ma/xyz',
      'https://facebook.com/xyz',
    ];
    render(<LocalGroups localGroups={links} />);

    const renderedLinks = screen.getAllByRole('link');
    expect(renderedLinks).toHaveLength(links.length);

    links.forEach((link, index) => {
      expect(renderedLinks[index]).toHaveAttribute('href', link);
    });
  });
});
