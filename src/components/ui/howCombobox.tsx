import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import {
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { IHowMeet } from "@/interfaces/Customers";

interface IHowMeetProps {
  handleHowMeet: (howMeet: IHowMeet) => void;
}

export default function HowCombobox(props: IHowMeetProps) {
  const [query, setQuery] = useState("");
  const [howMeetList, setHowMeetList] = useState<IHowMeet[]>([
    { id: 1, name: "Instagram" },
    { id: 2, name: "Google" },
    { id: 3, name: "Facebook" },
    { id: 4, name: "Bing" },
    { id: 5, name: "Elaborata" },
  ]);
  const [selected, setSelected] = useState<IHowMeet>(howMeetList[0]);

  const filteredHowMeetList =
    query === ""
      ? howMeetList
      : howMeetList.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    props.handleHowMeet(selected);
  }, [selected, props]);

  return (
    <div className="w-full">
      <Combobox
        value={selected}
        onChange={(value) => {
          if (value !== null) {
            setSelected(value);
          }
        }}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border border-black/15 bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-primary",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(item: IHowMeet) => item?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}>
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl border border-black/15 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden">
            {filteredHowMeetList.map((item) => (
              <ComboboxOption
                key={item.id}
                value={item}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10">
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-primary">{item.name}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
}
