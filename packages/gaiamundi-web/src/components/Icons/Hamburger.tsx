const Hamburger = ({
  isOpen,
  ...rest
}: { isOpen: boolean } & React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" {...rest}>
      <path
        className="inline-flex"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
      />
    </svg>
  );
};

export default Hamburger;
