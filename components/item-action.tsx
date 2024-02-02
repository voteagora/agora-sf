import { toLocaleDateString } from "../lib/dates";

type Props = {
  action: {
    meetingDate: string;
    version: string;
    actionBy: string;
    action: string;
    result: string;
    votes: {
      person: string;
      vote: string;
    }[];
  };
};

/**
 * 
 * @param param0 "meetingDate": "2023-07-28",
        "version": "1",
        "actionBy": "Mayor",
        "action": "APPROVED",
        "result": "",
        "votes": []
 * @returns 
 */
const ItemAction = ({ action }: Props) => {
  const {
    meetingDate,
    version,
    actionBy,
    action: actionTaken,
    result,
    votes,
  } = action;

  return (
    <section className="mx-4 mb-2 mt-2 flex flex-col gap-2 rounded-lg border bg-white p-4">
      <div className="text-sm text-stone-600">
        {toLocaleDateString(meetingDate)} {actionTaken} by {actionBy}
      </div>
      {votes.length > 0 && <div className="text-sm text-stone-600">Votes</div>}
      {votes.map((vote, index) => (
        <div key={index} className="flex justify-between text-sm font-medium">
          <span>{vote.person}</span>
          <span
            className={vote.vote === "No" ? "text-red-600" : "text-green-600"}
          >
            {vote.vote}
          </span>
        </div>
      ))}
    </section>
  );
};

export default ItemAction;
