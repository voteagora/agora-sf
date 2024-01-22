import Container from "../components/container";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

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
              <div className="border-b px-4 py-2 text-sm font-medium text-stone-600">
                On November 14 2023, the Board voted
              </div>
              {meeting.some((item) => item.Type === "Ordinance") ? (
                meeting.map((item, j) => (
                  item.Type === "Ordinance" && (
                    <Link as={`/items/${item["File #"]}`} href={"/items/[id]"}>
                      <div
                        key={item["File #"]}
                        className="border-b bg-white px-4 py-4"
                      >
                        <p className={`text-xs font-medium uppercase ${item.Status === "Passed" ? "text-green-600" : "text-stone-600"}`}>
                          {item.Status}
                        </p>
                        <h2 className="line-clamp-1 font-medium">{item.Name}</h2>
                        <div className="line-clamp-2 text-stone-600">
                          {item.Title}
                        </div>
                      </div>
                    </Link>
                  )
                ))
              ) : (
                <div className="text-stone-600 bg-white px-4 py-4">No ordinances at this meeting</div>
              )}
            </div>
          ))}
          <Footer />
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
