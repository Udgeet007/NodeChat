import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId: string) => {
  //retrieve friends for current user
  const friendIds = (await fetchRedis(
    "sismember",
    `user:${userId}:friends`
  )) as string[];

  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
      const parseFriend = JSON.parse(friend) as User;
      return parseFriend;
    })
  );

  return friends;
};
