import type { Entity } from "interfaces/entity";
import { isNotNilOrEmpty } from "utils/core-utils";
import * as uuid from "uuid";
import { merge } from "lodash";
import type { List } from "immutable";
import { Map, Record } from "immutable";
import type { PickKeysOfType } from "types/pick-keys-by-type";

interface RemapIdsOptions<T> {
    property?: PickKeysOfType<T, string>;
    /**
     * When true, regenerates `id` property explicitly. Useful if the `property` option is used to
     * remap a foreign key but the `id` property also needs to be changed for uniqueness
     */
    regenerateId?: boolean;
}

const generateId = (): string => uuid.v4();

const generateIdMap = <T extends Entity>(
    entities: Array<T> | List<T>
): Map<string, string> =>
    Map(entities.map((entity) => [entity.id, generateId()]));

const isUuid = (value?: string) =>
    isNotNilOrEmpty(value) && uuid.validate(value);

const remapIds = <T extends Entity>(
    entities: Array<T> | List<T>,
    idMap: Map<string, string>,
    options?: RemapIdsOptions<T>
) => {
    const { regenerateId = false, property = "id" } = options ?? {};

    return entities.map((entity) => {
        // We know that the property passed in resolves to a string
        const id: string = entity[property as keyof T] as any as string;
        let entityUpdate = {
            [property]: idMap.get(id)!,
        };

        if (regenerateId) {
            entityUpdate = merge(entityUpdate, { id: generateId() });
        }

        return Record.isRecord(entity)
            ? entity.merge(entityUpdate)
            : merge(entity, entityUpdate);
    });
};

export { generateId, generateIdMap, isUuid, remapIds };
