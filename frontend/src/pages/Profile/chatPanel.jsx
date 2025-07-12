import { useState } from "react";
import {
  MessageSquare,
  Star,
  X,
  ArrowRight,
  Paperclip,
  Send,
} from "lucide-react";

const ChatPanel = ({
  activeTab,
  activeChatId,
  pendingRequests,
  completedRequests,
  onClose,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const getActiveRequest = () => {
    if (activeTab === "pending") {
      return pendingRequests.find((req) => req.id === activeChatId);
    } else {
      return completedRequests.find((req) => req.id === activeChatId);
    }
  };

  const request = getActiveRequest();

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  if (!request) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-6 border border-gray-200">
        <MessageSquare size={48} className="text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Select a conversation
        </h3>
        <p className="text-gray-500 text-center">
          Choose a request from the list to view messages and details
        </p>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex flex-col h-full bg-white rounded-lg border border-gray-200">
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="text-indigo-700 font-bold">
              {request.userPhoto}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{request.user}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Star className="text-yellow-500 fill-yellow-500 w-3 h-3 mr-1" />
              {request.userRating}
            </div>
          </div>
        </div>
        <button
          className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-blue-50 rounded-lg p-3 flex items-center">
          <div className="flex-1">
            <p className="text-xs text-blue-600">Offering</p>
            <p className="font-medium">{request.skillOffered}</p>
          </div>
          <ArrowRight className="text-blue-400 mx-2" />
          <div className="flex-1">
            <p className="text-xs text-blue-600">Requesting</p>
            <p className="font-medium">{request.skillRequested}</p>
          </div>
        </div>

        {request.message && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700">Initial Message</p>
            <p className="text-gray-600 mt-1">{request.message}</p>
          </div>
        )}

        {request.attachment && (
          <div className="flex items-center text-blue-600 text-sm">
            <Paperclip size={14} className="mr-1" />
            <a href="#" className="hover:underline">
              {request.attachment}
            </a>
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Conversation
          </h4>

          {request.chatMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No messages yet. Start the conversation!
            </p>
          ) : (
            <div className="space-y-3">
              {request.chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                      msg.sender === "You"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "You"
                          ? "text-indigo-200"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
