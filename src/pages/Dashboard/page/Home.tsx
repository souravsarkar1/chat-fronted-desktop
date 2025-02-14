import { useEffect, useState } from "react";
import { getAllFriend, getAllNotFriend, getAllSendFriendRequest } from "../services/dashboardService";
import FriendList from "../components/FriendList";
import UserSuggestions from "../components/UserSuggestedFriend";
import { Tabs, Tab, Button } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { Users, UserPlus, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import AllSenedFriendRequest from "../components/AllSenedFriendRequest";

const Home = () => {
  const [allFriends, setAllFriends] = useState([]);
  const [allSendedRequests, setAllSentRequests] = useState([]);
  const [allNotFriends, setAllNotFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("friends");
  const [tabParams] = useSearchParams();

  useEffect(() => {
    if (tabParams.get("tab") === "suggested") {
      setActiveTab("suggestions");
    }
    if (tabParams.get("tab") === "friends") {
      setActiveTab("friends");
    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [friend, notFriend, sentRequest] = await Promise.all([
          getAllFriend(),
          getAllNotFriend(),
          getAllSendFriendRequest()
        ]);
        setAllFriends(friend.friends);
        setAllNotFriends(notFriend.notFriends);
        setAllSentRequests(sentRequest.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Fixed Tabs at the Top */}
      <div className="flex flex-row items-center sticky top-0 z-10 backdrop-blur-md bg-white/30 border-b border-gray-200/50">
        <Tabs
          aria-label="Social Network Tabs"
          fullWidth
          size="lg"
          color="primary"
          classNames={{
            tabList: "bg-transparent gap-6 w-full justify-center",
            cursor: "bg-blue-500/20",
            tab: "max-w-fit px-4 h-12",
            tabContent: "group-data-[selected=true]:text-blue-500",
          }}
          onSelectionChange={setActiveTab as any}
          selectedKey={activeTab}
          defaultSelectedKey={"friends"}
        >
          <Tab
            key="friends"
            value={"friends"}
            title={
              <div
                className={`flex items-center space-x-2 ${activeTab === "friends"
                  ? "bg-blue-500/10 py-2 px-4 rounded-full"
                  : ""
                  }`}
              >
                <Users className="w-5 h-5" />
                <span>Friends ({allFriends.length})</span>
              </div>
            }
          />
          <Tab
            key="suggestions"
            value={"suggestions"}
            title={
              <div
                className={`flex items-center space-x-2 ${activeTab === "suggestions"
                  ? "bg-blue-500/10 py-2 px-4 rounded-full"
                  : ""
                  }`}
              >
                <UserPlus className="w-5 h-5" />
                <span>Suggestions ({allNotFriends.length})</span>
              </div>
            }
          />
          <Tab
            key="sentRequests"
            value={"sentRequests"}
            title={
              <div
                className={`flex items-center space-x-2 ${activeTab === "sentRequests"
                  ? "bg-blue-500/10 py-2 px-4 rounded-full"
                  : ""
                  }`}
              >
                <UserPlus className="w-5 h-5" />
                <span>Sent Requests ({allSendedRequests.length})</span>
              </div>
            }
          />
        </Tabs>
        <div>
          <Button as={Link} to={"/me"} className="w-full h-10 bg-blue-500 text-white rounded-lg">View Profile</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-none shadow-sm">
          <CardBody className="p-0">
            {activeTab === "friends" && (
              <div className="py-6">
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <FriendList friends={allFriends} />
                )}
              </div>
            )}
            {activeTab === "suggestions" && (
              <div className="py-6">
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <UserSuggestions friends={allNotFriends} />
                )}
              </div>
            )}
            {activeTab === "sentRequests" && (
              <div className="py-6">
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <AllSenedFriendRequest friends={allSendedRequests} />
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Empty State */}
        {!isLoading && allFriends.length === 0 && allNotFriends.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No Connections Yet
            </h3>
            <p className="mt-2 text-gray-500">
              Start connecting with people to build your network!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;