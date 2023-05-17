import toast from "react-hot-toast";
import IconButton from "../iconButton/IconButton";
import CodeSnippetIcon from "../icons/codeSnippetIcon/CodeSnippetIcon";

interface Props {
  code: string;
}

function CodeSnippet({ code }: Props) {
  const successToast = () =>
    toast.success(
      "Code copied to clipboard! 🎉 Now you can paste the code into Sonic Pi and start jamming away. 🎶",
      { duration: 4000, id: "id of copySuccess" }
    );
  const errorToast = () =>
    toast.error(
      "Sorry, an error occurred while copying the code snippet to your clipboard. Please try again later.",
      { duration: 4000, id: "id of copyError" }
    );

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(`${code}`);
      successToast();
    } catch (err) {
      // fallback for iOS
      try {
        const el = document.createElement("textarea");
        el.value = `${code}`;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        successToast();
      } catch (err) {
        errorToast();
      }
    }
  };

  return (
    <>
      <IconButton onClick={handleCopySnippet}>
        <CodeSnippetIcon />
      </IconButton>
    </>
  );
}

export default CodeSnippet;
