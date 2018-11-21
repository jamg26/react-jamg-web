const initState = {
  default: true,
  windows: false,
  android: false,
  os: false,
  movies: false,
  about: false,
  ip: false,
  yt: false
};

const layoutReducer = (state = initState, action) => {
  switch (action.type) {
    case "home":
      return {
        default: true
      };
    case "windows":
      return {
        windows: true
      };
    case "android":
      return {
        android: true
      };
    case "os":
      return {
        os: true
      };
    case "movies":
      return {
        movies: true
      };
    case "about":
      return {
        about: true
      };
    case "iplocator":
      return {
        ip: true
      };
    case "youtubetomp3":
      return {
        yt: true
      };
    default:
      return state;
  }
};

export default layoutReducer;
