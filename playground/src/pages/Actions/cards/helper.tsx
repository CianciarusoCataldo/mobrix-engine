import { MoBrixEngineAction } from "mobrix-engine-types";
import { Button } from "mobrix-ui";
import { useDispatch } from "react-redux";

export const ActionsButtons = ({
  actions,
}: {
  actions: { name: string; action: MoBrixEngineAction }[];
}) => {
  const ActionComponent = ({
    name,
    action,
  }: {
    name: string;
    action: MoBrixEngineAction;
  }) => {
    const dispatch = useDispatch();

    return (
      <Button key={name} className="m-2" onClick={() => dispatch(action)}>
        {name}
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {actions.map((actionUi, key) => (
        <div key={"button_" + key}>
          <ActionComponent {...actionUi} />
        </div>
      ))}
    </div>
  );
};
