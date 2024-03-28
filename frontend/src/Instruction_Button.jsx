import './App.css'

export function Link_Button() {
  const openURL = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  const instruct = () => {
    //Makes sure instruct starts with https or yotube for the link (either valid) and that it contains a link to youtube.com - still not perfect
    if (exercise.instruct.match(/youtube.com/) && (exercise.instruct.startsWith('https://www.youtube.com') || exercise.instruct.startsWith('youtube.com'))) {
      openURL(exercise.instruct) //automatically ignores everything after first word so long as it is the link - above statements should make sure it is a link to youtube
    }
    else if (exercise.instruct != None) { //Opens a window that has the entire instructions printed out - not themed - only if the string is not empty
      var wnd = window.open("about:blank", "", "_blank");
      wnd.document.write(exercise.instruct);
    }
    else {
      alert("This workout has no instructions")
    }

    return (
      <button onClick={instruct}>Instructions</button>
    );
  } 
}
