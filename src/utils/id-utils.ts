import { Entity } from "interfaces/entity";
import { isNotNilOrEmpty } from "utils/core-utils";
import * as uuid from "uuid";
import { merge } from "lodash";
import { List, Map, Record } from "immutable";

const generateId = (): string => uuid.v4();

const generateIdMap = <T extends Entity>(
    entities: Array<T> | List<T>
): Map<string, string> =>
    Map(entities.map((entity) => [entity.id, generateId()]));

const isUuid = (value?: string) =>
    isNotNilOrEmpty(value) && uuid.validate(value);

const remapIds = <T extends Entity>(
    entities: Array<T> | List<T>,
    idMap: Map<string, string>
) =>
    entities.map((entity) => {
        const updatedId: Entity = {
            id: idMap.get(entity.id)!,
        };
        return Record.isRecord(entity)
            ? entity.merge(updatedId)
            : merge(entity, updatedId);
    });

export { generateId, generateIdMap, remapIds, isUuid };
