import { Col, Row } from "antd";
import { useController } from "react-hook-form";

import DataModelSelection from "@/components/DataModelSelection";
import DataAccessSelection from "@/components/DataAccessSelection";
import type {
  AccessType,
  DataAccessOption,
  DataModel,
  DataModelOption,
  DataResource,
} from "@/types/access";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";

interface AccessControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  resource: DataResource;
  defaultOpen?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

const AccessController: <T extends FieldValues>(
  props: AccessControllerProps<T>
) => JSX.Element = ({
  control,
  resource,
  defaultOpen = "",
  defaultValue,
  name,
}) => {
  const [selectedModel, setSelectedModel] = useState<string>(defaultOpen);

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const detectAccessType = (model: DataModel): AccessType => {
    if (!value || !value[model.title]) return "no";

    const noAccess = Object.keys(value[model.title])?.every(
      (k) => value?.[model.title][k]?.length === 0
    );

    if (noAccess) return "no";

    const selected = Object.keys(value[model.title])?.reduce(
      (sum, k2) => value[model.title][k2].length + sum,
      0
    );
    const all = Object.keys(model)
      .filter((key) => key !== "title")
      .reduce((sum, key) => sum + model[key as keyof DataModel].length, 0);

    if (selected < all) return "partial";

    return "full";
  };

  const createDataModelOptions = (): DataModelOption[] =>
    resource.dataModels?.map((m) => ({
      title: m.title,
      access: detectAccessType(m),
    }));

  const createDataAccessSelection = (): DataAccessOption => {
    const model = resource.dataModels.find((m) => m.title === selectedModel);
    return {
      measures: model?.measures,
      dimensions: model?.dimensions,
      segments: model?.segments,
    } as DataAccessOption;
  };

  const onAccessChange = (v: DataAccessOption) => {
    if (typeof value === "object") {
      value[selectedModel] = v;
      onChange(value);
    } else {
      onChange({ [selectedModel]: v } as typeof value);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={12}>
        <DataModelSelection
          onChange={(activeTitle) => setSelectedModel(activeTitle)}
          title={resource.title}
          dataModels={createDataModelOptions()}
          active={selectedModel}
        />
      </Col>
      <Col span={24} lg={12}>
        {selectedModel && (
          <DataAccessSelection
            options={createDataAccessSelection()}
            onChange={onAccessChange}
            value={value?.[selectedModel]}
          />
        )}
      </Col>
    </Row>
  );
};

export default AccessController;
