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
    else {
      alert(exercise.instruct) //will pull up a window showing text instructions - needs to be cleaner
    }

    return (
      <button onClick={instruct}>Instructions</button>
    );
  } 
}