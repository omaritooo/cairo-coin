import { toFixedWithCommas } from "src/services/helpers";
import { countryFlags } from "src/services/providers/countries";

interface Props {
  name: string;
  list: { [value: string]: number };
  subtitle?: string;
  type: "currency" | "gold";
}
export const ListCard = ({ name, subtitle, list, type }: Props) => (
  <article className="relative flex flex-col justify-between w-full grid-cols-1 px-4 py-4 overflow-hidden text-black bg-white shadow-lg dark:text-white dark:bg-dark-container rounded-xl">
    <h1 className="flex items-center text-2xl font-semibold text-black gap-x-2 dark:text-dark-titles">
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
    <h1 className="mt-2 mb-3 italic">{title}</h1>
    <div className="flex flex-col gap-y-3 ">
      {Object.keys(list).map((el) =>
        type === "currency" ? (
          <ListItem code={el} key={el} value={list[el]} />
        ) : (
          <GoldListItem code={el} key={el} value={list[el]} />
        )
      )}
    </div>
  </div>
);

const ListItem = ({ code, value }: { code: string; value: number }) => {
  const flag = countryFlags.find((el) => el.currencyCode == code);

  return (
    <>
      <div className="flex justify-between w-full">
        <span className="flex items-center font-normal gap-x-1">
          <img
            className="inline h-4 rounded-sm rtl:ml-2 ltr:mr-2"
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${flag?.code}.svg`}
          />
          {flag?.currencyCode}
        </span>
        <span className="font-normal">{toFixedWithCommas(`${value}`, 2)}</span>
      </div>
      <hr className="border-[0.5px] border-gray-300 dark:border-dark-titles/50" />
    </>
  );
};

const GoldListItem = ({ code, value }: { code: string; value: number }) => {
  console.log("Gold");
  return (
    <>
      <div className="flex justify-between w-full">
        <span className="flex items-center font-normal gap-x-1">{code}</span>
        <span className="font-normal">{toFixedWithCommas(`${value}`, 2)}</span>
      </div>
      <hr className="border-[0.5px] last-of-type:hidden border-gray-300 dark:border-dark-titles/50" />
    </>
  );
};
ListCard.Section = ListSection;
