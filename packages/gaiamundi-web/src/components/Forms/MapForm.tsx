import './bars.css';
const MapForm: React.FC = () => {
  return (
    <div className="rounded w-full">
      <label
        htmlFor="Nom"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Nom
      </label>
      <div className="mt-1 rounded-md">
        <input
          id="nom"
          className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
        />
      </div>
      <Bars />
    </div>
  );
};

const Bars = () => {
  return (
    <div className="container">
      <div className="topic">CSS Vertical Tabs.</div>
      <div className="content">
        <input type="radio" name="slider" defaultChecked id="home" />
        <input type="radio" name="slider" id="blog" />
        <input type="radio" name="slider" id="help" />
        <input type="radio" name="slider" id="code" />
        <input type="radio" name="slider" id="about" />
        <div className="list">
          <label htmlFor="home" className="home">
            <i className="fas fa-home" />
            <span className="title">Home</span>
          </label>
          <label htmlFor="blog" className="blog">
            <span className="icon">
              <i className="fas fa-blog" />
            </span>
            <span className="title">Blog</span>
          </label>
          <label htmlFor="help" className="help">
            <span className="icon">
              <i className="far fa-envelope" />
            </span>
            <span className="title">Help</span>
          </label>
          <label htmlFor="code" className="code">
            <span className="icon">
              <i className="fas fa-code" />
            </span>
            <span className="title">Code</span>
          </label>
          <label htmlFor="about" className="about">
            <span className="icon">
              <i className="far fa-user" />
            </span>
            <span className="title">About</span>
          </label>
          <div className="slider" />
        </div>
        <div className="text-content">
          <div className="home text">
            <div className="title">Home Content</div>
            <p>qjsdqsjdsq</p>
          </div>
          <div className="blog text">
            <div className="title">Blog Content</div>
            <p>qjsdqsjdsq</p>
          </div>
          <div className="help text">
            <div className="title">Help Content</div>
            <p>Lqjsdqsjdsqqsdqsdsq</p>
          </div>
          <div className="code text">
            <div className="title">Code Content</div>
            <p>nice</p>
          </div>
          <div className="about text">
            <div className="title">About Content</div>
            <p>booga</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MapForm;
