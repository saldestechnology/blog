import { getPosts } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
    const posts = getPosts(0);

    res.status(200).json(posts);
}