import axios from "axios";
import { useState, useContext } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import {
  FaCaretDown,
  FaEye,
  FaImage,
  FaRegSmile,
  FaUserMinus,
} from "react-icons/fa";
import { IoMdCode } from "react-icons/io";
import { IoLinkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbSquareLetterA } from "react-icons/tb";
import { ThemeContext } from "./ThemeToggle.jsx"; // Assume ThemeContext is set up to provide theme information

function CustomMail({ threadId, onClose }) {
  const { darkMode } = useContext(ThemeContext);
  const [replyData, setReplyData] = useState({
    to: "",
    from: "",
    subject: "",
    body: "",
  });

  const handleSendReply = async () => {
    // Make a POST request to send the reply
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`,
        {
          to: replyData.to,
          from: replyData.from,
          subject: replyData.subject,
          body: replyData.body,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Reply sent successfully");
      onClose(); // Close the CustomMail component
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`fixed top-0 left-0 flex justify-center items-center h-full w-full z-20 ${darkMode ? 'bg-gray-900/25' : 'bg-gray-400/25'}`}>
      <div className={`w-1/2 h-4/5 rounded-lg border ${darkMode ? 'bg-[#141517] border-[#41464B]' : 'bg-white border-gray-300'}`}>
        <div className={`flex justify-between items-center px-4 rounded-t-lg py-2 border-b ${darkMode ? 'bg-[#23272C] border-[#41464B]' : 'bg-gray-200 border-gray-300'}`}>
          <div className={`pl-4 text-sm ${darkMode ? 'text-white' : 'text-black'}`}>Reply</div>
          <div onClick={onClose}>
            <RxCross2 className="text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex text-sm py-2 border-b border-gray-300 pl-8">
          <div className={`text-${darkMode ? '[#BAB9BD]' : 'gray-700'}`}>To :</div>
          <input
            className={`bg-transparent ml-4 ${darkMode ? 'text-white' : 'text-black'}`}
            placeholder="Recipient's Email"
            name="to"
            value={replyData.to}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex text-sm py-2 border-b border-gray-300 pl-8">
          <div className={`text-${darkMode ? '[#BAB9BD]' : 'gray-700'}`}>From :</div>
          <input
            className={`bg-transparent ml-4 ${darkMode ? 'text-white' : 'text-black'}`}
            placeholder="Your Email"
            name="from"
            value={replyData.from}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex text-sm py-2 border-b border-gray-300 pl-8">
          <div className={`text-${darkMode ? '[#BAB9BD]' : 'gray-700'}`}>Subject :</div>
          <input
            className={`bg-transparent ml-4 ${darkMode ? 'text-white' : 'text-black'}`}
            placeholder="Subject"
            name="subject"
            value={replyData.subject}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex text-sm py-2 border-b border-gray-300 px-4 pr-8 pt-8 h-2/3">
          <textarea
            className={`bg-transparent ml-4 w-full h-full ${darkMode ? 'text-white' : 'text-black'}`}
            placeholder="Message Body"
            name="body"
            value={replyData.body}
            onChange={handleTextAreaChange}
          />
        </div>

        <div className="flex flex-wrap space-x-8 items-center h-15.5 ml-8 mt-1">
          <div
            className={`bg-gradient-to-r from-[#4B63DD] to-[#0524BFFC] px-5 py-2 rounded-md flex items-center cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
            onClick={handleSendReply}
          >
            Send <FaCaretDown className="ml-4" />
          </div>
          <div className={`flex items-center ${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
            <BsLightningChargeFill className="mr-3" />
            Variables
          </div>
          <div className={`flex items-center ${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
            <FaEye className="mr-3" />
            Preview Email
          </div>
          <div className="flex space-x-3 text-xl">
            <div className={`${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
              <TbSquareLetterA />
            </div>
            <div className={`${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
              <IoLinkSharp />
            </div>
            <div className={`${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
              <FaImage />
            </div>
            <div className={`${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
              <FaRegSmile />
            </div>
            <div className={`${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
              <FaUserMinus />
            </div>
            <div className={`${darkMode ? 'text-[#ADADAD]' : 'text-gray-700'}`}>
              <IoMdCode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomMail;
