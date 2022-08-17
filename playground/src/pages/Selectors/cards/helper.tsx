import { openModal } from "mobrix-engine-plugins";
import { Button } from "mobrix-ui";
import { useDispatch, useSelector } from "react-redux";

export const SelectorsButtons = ({
  selectors,
}: {
  selectors: { name: string; selector: any }[];
}) => {
  const dispatch = useDispatch();

  const SelectorComponent = ({
    name,
    selector,
  }: {
    name: string;
    selector: any;
  }) => {
    const selectorData = useSelector(selector);

    return (
      <Button
        key={name}
        className="m-2"
        onClick={() => dispatch(openModal("ContextModal", selectorData))}
      >
        {name}
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {selectors.map((selectorUi, key) => (
        <div key={"button_" + key}>
          <SelectorComponent {...selectorUi} />
        </div>
      ))}
    </div>
  );
};
