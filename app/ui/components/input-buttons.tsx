import { ReactNode, useState, useEffect } from "react";
import clsx from "clsx";
import { Slider } from "@/components/ui/slider";
import useStore from "@/app/store";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface InputButtonProps {
  title: string | ReactNode;
  tooltip: string | ReactNode;
  icon: string | ReactNode;
  index: number;
  onSelection: (title: string | ReactNode, isSelected: boolean) => void;
  isSelected: boolean;
  onInputChange?: (index: number, value: string) => void;
  inputValue?: string;
}

export function InputButton({
  title,
  tooltip,
  icon,
  index,
  onSelection,
  isSelected,
  onInputChange,
  inputValue,
}: InputButtonProps) {
  const getBackgroundColorClass = () => {
    const baseClasses = "bg-white text-black";

    const selectedClasses = "text-white";

    const hoverClassesLg = "lg:hover:font-semibold lg:hover:text-white";

    switch (index) {
      case 0:
        return isSelected
          ? `bg-semantic_green_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-semantic_green_light`;
      case 1:
        return isSelected
          ? `bg-blue-400 ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-blue-400`;
      case 2:
        return isSelected
          ? `bg-chart_emerald_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-chart_emerald_light`;
      case 3:
        return isSelected
          ? `bg-chart_emerald_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-chart_emerald_light`;
      case 4:
        return isSelected
          ? `bg-chart_emerald_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-chart_emerald_light`;
      case 5:
        return isSelected
          ? `bg-chart_emerald_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-chart_emerald_light`;
      case 6:
        return isSelected
          ? `bg-chart_emerald_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-chart_emerald_light`;
      case 7:
        return isSelected
          ? `bg-chart_emerald_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-chart_emerald_light`;
      default:
        return isSelected
          ? `bg-semantic_red_light ${selectedClasses}`
          : `${baseClasses} ${hoverClassesLg} lg:hover:bg-semantic_red_light`;
    }
  };

  const getShadowColorClass = () => {
    const baseClasses = "lg:shadow-semantic_green_light/50 shadow-sm"; // Use default shadow for larger screens

    switch (index) {
      case 0:
        return `${baseClasses} shadow-semantic_green_light/50`;
      case 1:
        return `${baseClasses} shadow-blue-400/50`;
      case 2:
        return `${baseClasses} shadow-chart_emerald_light/50`;
      case 3:
        return `${baseClasses} shadow-chart_emerald_light/50`;
      case 4:
        return `${baseClasses} shadow-chart_emerald_light/50`;
      case 5:
        return `${baseClasses} shadow-chart_emerald_light/50`;
      case 6:
        return `${baseClasses} shadow-chart_emerald_light/50`;
      case 7:
        return `${baseClasses} shadow-chart_emerald_light/50`;
      default:
        return `${baseClasses} shadow-semantic_red_light/50`;
    }
  };

  const handleClick = () => {
    onSelection(title, !isSelected);
  };

  const placeholder = (index: number): string => {
    switch (index) {
      case 1:
        return "70";
      case 2:
        return "180";
      case 3:
        return "26";
      default:
        return "Escribe aquí";
    }
  };

  if (index > 0 && index < 4) {
    return (
      <div className="flex flex-row gap-2 justify-center items-center w-full">
        <span className={`${icon} w-1/5 text-xl`}></span>
        <input
          type="number"
          className="rounded-lg placeholder-slate-500/50 w-4/5"
          placeholder={placeholder(index)}
          onChange={(e) =>
            onInputChange && onInputChange(index, e.target.value)
          }
          value={inputValue}
        />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-[45%] h-16 m-1 p-1 flex justify-center">
          <div
            onClick={handleClick}
            className={clsx(
              "button_input rounded-lg group border-[0.5px] h-full w-full flex flex-col justify-center items-center text-ellipsis overflow-hidden transition-colors duration-300 ",
              getBackgroundColorClass(),
              getShadowColorClass()
            )}
          >
            <span
              className={`${icon} ${
                isSelected ? "text-white" : "text-black"
              } lg:group-hover:text-white`}
            ></span>
            {typeof title === "string" ? (
              <h1
                className={`w-full text-[10px] lg:text-xs text-ellipsis overflow-hidden text-center uppercase ${
                  isSelected ? "text-white" : "text-black"
                } lg:group-hover:text-white lg:group-hover:font-medium`}
              >
                {title}
              </h1>
            ) : null}
          </div>
        </TooltipTrigger>
        {tooltip !== undefined && (
          <TooltipContent>
            <p className="text-center">{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
// FULL SECTIONS RENDERING AND USAGE OF BUTTON FUNCTION FROM ABOVE
interface SectionItem {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  arr: {
    title: string | ReactNode;
    icon?: string | ReactNode;
    tooltip?: string | ReactNode;
  }[];
}

interface InputSectionProps {
  arr: SectionItem[];
}

export function InputSection({ arr }: InputSectionProps) {
  const store = useStore();
  const maxValue = 100000;
  const minValue = 25000;
  const [sliderValue, setSliderValue] = useState(minValue);
  const [sliderError, setSliderError] = useState(false);
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: (string | ReactNode)[];
  }>({
    presupuesto: [minValue.toString()], // Initialize presupuesto with minValue as a string
  });

  const [inputValues, setInputValues] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    // Ensure you handle both conditions properly
    if (store.apiRunning === false && store.body !== null) {
      setSelectedValues({
        presupuesto: [minValue.toString()], // Adjust this based on your requirements
      });
    } else if (store.error) {
      setSelectedValues({
        presupuesto: [minValue.toString()], // Adjust this based on your requirements
      });
    }
    // No need for an `else return;`, the `return;` is not needed here.
  }, [store.apiRunning]); // Add `store.body` to dependencies

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    setSliderValue(value);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      presupuesto: [value.toString()], // Update presupuesto as a string array with the new value
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      presupuesto: [value[0].toString()], // Update presupuesto as a string array with the new slider value
    }));
    store.setInput("budget", value[0].toString());
  };

  const handleSelection = (
    sectionTitle: string,
    itemTitle: string | ReactNode,
    isSelected: boolean
  ) => {
    setSelectedValues((prevValues) => {
      let updatedValues: { [key: string]: (string | ReactNode)[] } = {};

      // Determine if sectionTitle is one of the first three sections
      const isSingleSelectionSection = [
        "genre",
        "objective",
        "activity",
        "body",
        "diet",
      ].includes(sectionTitle);

      if (isSingleSelectionSection) {
        // Handle single selection sections (only one value allowed)
        updatedValues = {
          ...prevValues,
          [sectionTitle]: isSelected ? [itemTitle] : [],
        };
        store.setInput(sectionTitle, isSelected ? itemTitle : null);
      } else {
        // Handle multi-selection sections (multiple values allowed)
        const currentSelections = prevValues[sectionTitle] || [];
        if (isSelected) {
          updatedValues = {
            ...prevValues,
            [sectionTitle]: [...currentSelections, itemTitle],
          };
          store.setInput(sectionTitle, [...currentSelections, itemTitle]);
        } else {
          updatedValues = {
            ...prevValues,
            [sectionTitle]: currentSelections.filter(
              (value) => value !== itemTitle
            ),
          };
          store.delInput(sectionTitle, itemTitle as string);
        }
      }

      return updatedValues;
    });
  };

  const handleInputButtonChange = (index: number, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
    const sectionTitle =
      index === 1 ? "weight" : index === 2 ? "height" : "age";
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [sectionTitle]: [value],
    }));
  };

  useEffect(() => {
    const lastKey = Object.keys(selectedValues).pop();
    if (lastKey) {
      const lastValue = selectedValues[lastKey];
      store.setInput(lastKey, lastValue);
    }
  }, [selectedValues]);

  useEffect(() => {
    if (sliderValue < minValue || sliderValue > maxValue) {
      setSliderError(true);
    } else {
      setSliderError(false);
    }
  }, [sliderValue]);

  function TitleToEsp(item: string | ReactNode) {
    const expr = item;
    switch (expr) {
      case "genre":
        return "Genero (Biológico)";
      case "activity":
        return "Actividad física";
      case "weight":
        return "Peso (kg)";
      case "height":
        return "Altura (cm)";
      case "age":
        return "Edad";
      case "objective":
        return "Objetivo";
      case "body":
        return "Tipo de cuerpo";
      case "diet":
        return "Tipo de dieta";
      case "allergies":
        return "Alergias";
      case "intolerance":
        return "Intolerancias";
      case "condition":
        return "Condiciones medicas";
      default:
    }
  }

  return (
    <>
      {arr.map((input, index) => (
        <div
          key={index}
          className="p-2 border-primary_text_light/10 border-t-2"
        >
          <h1
            className={`text-xl ${
              index > 7 ? "text-red-700" : "text-accent_color_light"
            } uppercase font-medium tracking-wide text-center md:text-left`}
          >
            {index > 4 && index < 8
              ? `${TitleToEsp(input.title)}**`
              : TitleToEsp(input.title)}
          </h1>
          {input.subtitle && <h3>{input.subtitle}</h3>}
          <div className="flex flex-wrap justify-center p-1 rounded-xl">
            {input.arr.map((btn, btnIndex) => (
              <InputButton
                key={btnIndex}
                title={btn.title}
                tooltip={btn.tooltip}
                icon={btn.icon}
                index={index}
                onSelection={(itemTitle, isSelected) =>
                  handleSelection(input.title as string, itemTitle, isSelected)
                }
                isSelected={
                  selectedValues[input.title as string]?.includes(btn.title) ||
                  false
                }
                onInputChange={handleInputButtonChange}
                inputValue={inputValues[index] || ""}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="shadow-sm p-2 flex flex-col gap-3 border-primary_text_light/10 border-t-2">
        <h1
          className={`text-xl text-accent_color_light
           uppercase font-medium tracking-wide text-center md:text-left`}
        >
          Presupuesto Semanal
        </h1>
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <p className="text-base font-semibold">$</p>
          <input
            type="number"
            placeholder="15000"
            value={sliderValue}
            onChange={handleInputChange}
            className={`w-1/2 border p-2 rounded-lg focus:border-green-700 ${
              sliderError ? "border-red-600" : ""
            }`}
          />
          <p className="text-base font-semibold">CLP</p>
        </div>
        {sliderError && (
          <p className="text-red-600 text-sm">
            Por favor ingresa un valor entre {minValue} y {maxValue} CLP.
          </p>
        )}
        <div className="flex flex-wrap justify-center bg-white rounded-xl">
          <Slider
            defaultValue={[sliderValue]}
            value={[sliderValue]}
            min={minValue}
            max={maxValue}
            step={5000}
            onValueChange={handleSliderChange}
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <p className="text-sm font-semibold">Min: {minValue} - </p>
          <p className="text-sm font-semibold ml-1">Max: {maxValue}</p>
        </div>
      </div>
    </>
  );
}

export default InputSection;
