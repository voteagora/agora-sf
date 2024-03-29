import Layout from "../../components/layout";
import Container from "../../components/container";
import fs from "fs";
import path from "path";
import Header from "../../components/header";
import Footer from "../../components/footer";

type Props = {
  fileData: any;
  actionsData: any;
  chatgptData: any;
};

const EMPTY_CHATGPT_RESPONSE = {
  "Before Change": "N/A",
  "Proposed Change": "N/A",
  Impact: "N/A",
  Rationale: "N/A",
  "Approval Process": "N/A",
  Accountability: "N/A",
};

const EMPTY_ACTION = {
  votes: [],
};

export default function ItemPage({
  fileData,
  actionsData,
  chatgptData,
}: Props) {
  const emptyActions = actionsData.length === undefined;
  // Verify that every element in chatgptData is a string
  Object.keys(chatgptData).forEach((key) => {
    if (typeof chatgptData[key] !== "string") {
      chatgptData[key] = "N/A";
    }
  });

  let lastVote;
  if (!emptyActions) {
    lastVote =
      actionsData.find((action) => action.votes.length !== 0) || EMPTY_ACTION;
  }

  return (
    <Layout>
      <Container>
        <Header />
        <section className="mx-4 mt-4">
          <div className="text-sm font-medium text-stone-600">
            <span>Latest status: </span>
            {emptyActions ? (
              <span>Undefined</span>
            ) : (
              <span className="lowercase">
                {actionsData[0]["action"]} by {actionsData[0]["actionBy"]}
              </span>
            )}
          </div>
          <div className="text-xl font-extrabold">{fileData["Name"]}</div>
        </section>
        <section className="mx-4 mt-4">
          <div className="text-sm font-medium text-stone-600">
            Current state
          </div>
          <div className="mb-6">{chatgptData["Before Change"]}</div>
          <div className="text-sm font-medium text-stone-600">
            Proposed changes
          </div>
          <div className="mb-6">{chatgptData["Proposed Change"]}</div>
          <div className="text-sm font-medium text-stone-600">Impact</div>
          <div className="mb-6">{chatgptData["Impact"]}</div>
          <div className="text-sm font-medium text-stone-600">Rationale</div>
          <div className="mb-6">{chatgptData["Rationale"]}</div>
          <div className="text-sm font-medium text-stone-600">
            Approval process
          </div>
          <div className="mb-6">{chatgptData["Approval Process"]}</div>
          <div className="text-sm font-medium text-stone-600">
            Accountability
          </div>
          <div className="mb-6">{chatgptData["Accountability"]}</div>

          <div className="mb-6 rounded-md border p-3 text-xs text-stone-600">
            This summary was generated by ChatPGT, based on the source text of
            this legislation, which you can find below.
          </div>
        </section>
        {!emptyActions && (
          <section className="mx-4 mb-8 mt-4 flex flex-col gap-2 rounded-lg border bg-white p-4">
            <div className="text-sm text-stone-600">
              How the board voted on the latest version
            </div>

            {lastVote.votes.map((vote, index) => (
              <div
                key={index}
                className="flex justify-between text-sm font-medium"
              >
                <span>{vote.person}</span>
                <span
                  className={
                    vote.vote === "No" ? "text-red-600" : "text-green-600"
                  }
                >
                  {vote.vote}
                </span>
              </div>
            ))}
          </section>
        )}
        <Footer />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const server = "https://sfgov.s3.us-east-1.amazonaws.com";

  // Construct the URLs using the id from params
  const fileURL = `${server}/files/${id}.json`;
  const actionsURL = `${server}/actions/${id}.json`;
  const chatgptURL = `${server}/chatgpt/${id}.json`;

  // Fetch data from each URL
  const fileData = await fetch(fileURL)
    .then((res) => res.json())
    .catch(() => ({})); // if file doesn't exist, just return empty object
  const actionsData = await fetch(actionsURL)
    .then((res) => res.json())
    .catch(() => [EMPTY_ACTION]); // if actions don't exist, just return a single empty action
  const chatgptData = await fetch(chatgptURL)
    .then((res) => res.json())
    .catch(() => EMPTY_CHATGPT_RESPONSE); // if chatgpt summary doesn't exist, just return empty summary

  // Pass the fetched data to the page via props

  return {
    props: {
      fileData,
      actionsData,
      chatgptData,
    },
  };
}

export async function getStaticPaths() {
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

  //
  // Flatten meetingsData
  const flattenedMeetingsData = [].concat.apply([], meetingsData);
  const fileIds = flattenedMeetingsData.map((data) => data["File #"]);

  const paths = fileIds.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
}
