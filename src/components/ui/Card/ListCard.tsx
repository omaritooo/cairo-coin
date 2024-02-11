import { toFixedWithCommas } from "src/services/helpers";
import { countryFlags } from "src/services/providers/countries";

interface Props {
  name: string;
  list: { [value: string]: number };
  subtitle?: string;
  type: "currency" | "gold";
}
export const ListCard = ({ name, subtitle, list, type }: Props) => (
  <article className="dark:bg-dark-container relative flex w-full grid-cols-1 flex-col justify-between overflow-hidden rounded-xl bg-white px-4 py-4 text-black shadow-lg dark:text-white">
    <h1 className="flex items-center gap-x-2 text-2xl font-semibold text-black dark:text-white">
      {name}
    </h1>
    <ListCard.Section list={list} title={subtitle} type={type} />
    <div />
  </article>
);

const ListSection = ({
  title,
  list,
  type,
}: {
  title?: string;
  list: { [value: string]: number };
  type: "currency" | "gold";
}) => (
  <div className="h-fit">
    <h1 className="mb-3 mt-2 italic">{title}</h1>
    <div className="flex flex-col gap-y-3 ">
      {Object.keys(list).map((el) =>
        type === "currency" ? (
          <ListItem code={el} key={el} value={list[el]} />
        ) : (
          <GoldListItem code={el} key={el} value={list[el]} />
        ),
      )}
    </div>
  </div>
);

const ListItem = ({ code, value }: { code: string; value: number }) => {
  const flag = countryFlags.find((el) => el.currencyCode == code);

  return (
    <>
      <div className="flex w-full justify-between">
        <span className="flex items-center gap-x-1 font-normal">
          <img
            className="inline h-4 rounded-sm ltr:mr-2 rtl:ml-2"
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${flag?.code}.svg`}
          />
          {flag?.currencyCode}
        </span>
        <span className="font-normal">{toFixedWithCommas(`${value}`, 2)}</span>
      </div>
      <hr className="dark:border-dark-titles/50 border-[0.5px] border-gray-300 last-of-type:hidden" />
    </>
  );
};

const GoldListItem = ({ code, value }: { code: string; value: number }) => {
  console.log("Gold");
  return (
    <>
      <div className="flex w-full justify-between">
        <span className="flex items-center gap-x-1 font-normal">{code}</span>
        <span className="font-normal">{toFixedWithCommas(`${value}`, 2)}</span>
      </div>
      <hr className="dark:border-dark-titles/50 border-[0.5px] border-gray-300 last-of-type:hidden" />
    </>
  );
};
ListCard.Section = ListSection;
