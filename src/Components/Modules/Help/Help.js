import Button from "../../Elements/Button";
import HelpContent from "./HelpContent";

function Help(store) {


  // Initial

  const help = document.createElement('div');
  help.className = "imposter-outer-container";
  help.style.display = "none";


  // Create Elements

  const close = Button({
    label: "Close",
    action: closeHelp,
    classes: "button slub secondary"
  });


  // Appends

  const imposterContainer = document.createElement('div');
  imposterContainer.className = "imposter-container";
  help.appendChild(imposterContainer);

  const imposter = document.createElement('div');
  imposter.className = "imposter stack-xl";
  imposterContainer.appendChild(imposter);

  const helpContent = document.createElement('div');
  helpContent.className = "stack";
  helpContent.appendChild(HelpContent());
  imposter.appendChild(helpContent);

  const helpHide = document.createElement('div');
  helpHide.className = "insulate";
  helpHide.appendChild(close);
  imposter.appendChild(helpHide);

  const imposterOverlay = document.createElement('div');
  imposterOverlay.className = "imposter-overlay";
  help.appendChild(imposterOverlay);

  
  // Functions

  function closeHelp() {
    store.setData({help: false});
  }
  
  function updateHelp() {
    if(help.style.display === "none" && store.getData().help === true) {
      help.style.display = "block";
      document.body.classList.add("help-lock");
    } else if(help.style.display === "block" && store.getData().help === false) {
      help.style.display = "none";
      document.body.classList.remove("help-lock");
    }
  }

  store.subscribe(updateHelp);


  return help;

}

export default Help;