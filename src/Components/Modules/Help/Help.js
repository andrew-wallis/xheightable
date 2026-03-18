import HelpTemplate from "./HelpTemplate";
import Button from "../../Elements/Button";

function Help(store) {


  // Template

  const help = HelpTemplate();


  // Elements

  help.hide.appendChild(Button({
    label: "Close",
    action: closeHelp,
    classes: "button slub secondary"
  }));

  
  // Functions

  function closeHelp() {
    store.setData({help: false});
  }
  
  function updateHelp() {
    if(help.template.style.display === "none" && store.getData().help === true) {
      help.template.style.display = "block";
      document.body.classList.add("help-lock");
    } else if(help.template.style.display === "block" && store.getData().help === false) {
      help.template.style.display = "none";
      document.body.classList.remove("help-lock");
    }
  }

  store.subscribe(updateHelp);


  return help.template;

}

export default Help;