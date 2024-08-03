import { ReactNode, useState, useEffect } from "react";
import clsx from "clsx";
import { Slider } from "@/components/ui/slider";
import useStore from "@/app/store";

// INPUT BUTTON COMPONENT FROM THE FORM
interface InputButtonProps {
  title: string | ReactNode;
  icon: string | ReactNode;
  index: number;
  onSelection: (title: string | ReactNode, isSelected: boolean) => void;
  isSelected: boolean;
  onInputChange?: (index: number, value: string) => void;
  inputValue?: string;
}

export function InputButton({
  title,
  icon,
  index,
  onSelection,
  isSelected,
  onInputChange,
  inputValue,
}: InputButtonProps) {
  const getBackgroundColorClass = () => {
    switch (index) {
      case 0:
        return isSelected
          ? "bg-semantic_green_light text-white"
          : "hover:bg-semantic_green_light";
      case 1:
        return isSelected ? "bg-blue-400 text-white" : "hover:bg-blue-400";
      case 2:
        return isSelected
          ? "bg-chart_emerald_light text-white"
          : "hover:bg-chart_emerald_light";
      case 3:
        return isSelected
          ? "bg-chart_emerald_light text-white"
          : "hover:bg-chart_emerald_light";
      case 4:
        return isSelected
          ? "bg-chart_emerald_light text-white"
          : "hover:bg-chart_emerald_light";
      case 5:
        return isSelected
          ? "bg-chart_emerald_light text-white"
          : "hover:bg-chart_emerald_light";
      case 6:
        return isSelected
          ? "bg-chart_emerald_light text-white"
          : "hover:bg-chart_emerald_light";
      case 7:
        return isSelected
          ? "bg-chart_emerald_light text-white"
          : "hover:bg-chart_emerald_light";
      default:
        return isSelected
          ? "bg-semantic_red_light text-white"
          : "hover:bg-semantic_red_light";
    }
  };

  const handleClick = () => {
    console.log(`Clicked: ${title}, isSelected: ${isSelected}`);
    onSelection(title, !isSelected); // Toggle selection state
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
    <button
      onClick={handleClick}
      className={clsx(
        "button_input rounded-lg border-[1px] border-light w-1/2 md:w-1/3 flex flex-col justify-center items-center  m-2 text-ellipsis overflow-hidden transition-colors duration-300",
        getBackgroundColorClass()
      )}
    >
      <span className={`${icon}`}></span>
      {typeof title === "string" ? (
        <h1 className="text-xs text-left break-words uppercase ">{title}</h1>
      ) : null}
    </button>
  );
}

// FULL SECTIONS RENDERING AND USAGE OF BUTTON FUNCTION FROM ABOVE
interface SectionItem {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  arr: { title: string | ReactNode; icon?: string | ReactNode }[];
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setSliderValue(value);
      setSelectedValues((prevValues) => ({
        ...prevValues,
        presupuesto: [value.toString()], // Update presupuesto as a string array with the new value
      }));
    }
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
    store.setInput(sectionTitle, value);
  };

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
        console.log(`Wrong key passed`);
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
          <div className="flex flex-wrap justify-center bg-white rounded-xl">
            {input.arr.map((btn, btnIndex) => (
              <InputButton
                key={btnIndex}
                title={btn.title}
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
      <div className="shadow-sm p-6 flex flex-col gap-3 border-primary_text_light/10 border-t-2">
        <h1 className="text-xl text-accent_color_light uppercase font-medium tracking-wide text-left">
          Presupuesto
        </h1>
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <p className="text-base font-semibold">$</p>
          <input
            type="number"
            placeholder="15.000 clp"
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
          <p className="text-base font-semibold">Min: {minValue} - </p>
          <p className="text-base font-semibold ml-1">Max: {maxValue}</p>
        </div>
      </div>
    </>
  );
}

export default InputSection;
