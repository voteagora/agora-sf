import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import Link from "next/link";
import Header from "../components/header";

type Props = {
  allPosts: Post[];
  meetingsData: any;
};

export default function Index({ allPosts, meetingsData }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`SF Agora`}</title>
        </Head>
        <Container>
          <Header />
          {meetingsData.map((meeting, i) => (
            <div key={i}>
              <div className="border-b px-4 text-stone-600 font-medium py-2 text-sm">
                On November 14 2023, the Board voted
              </div>
              {meeting.map((item, j) => (
                <Link as={`/items/${item["File #"]}`} href={"/items/[id]"}>
                  <div key={item["File #"]} className="border-b bg-white px-4 py-4">
                    <p className="text-xs font-medium uppercase text-green-600">
                      {item.Status}
                    </p>
                    <h2 className="line-clamp-1 font-medium">{item.Name}</h2>
                    <div className="line-clamp-2 text-stone-600">
                      {item.Title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  // Read the JSON file
  const data = fs.readFileSync(
    path.join(process.cwd(), "_data", "meetings.json"),
    "utf8",
  );
  const urls = JSON.parse(data);

  // Fetch data from each URL
  const meetingsData = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      return response.json();
    }),
  );

  return {
    props: { allPosts, meetingsData },
  };
};
