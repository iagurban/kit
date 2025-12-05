import {
  collectRecursiveSelectionPair,
  findGqlNodeByPath,
  flattenSpreads,
  GqlASTField,
  GqlASTFragmentDefinition,
  GqlASTFragmentSpread,
  GqlASTInlineFragmentSpread,
  GqlASTSelectionSet,
  unpackSelectArgs,
} from './graphql-traverse';

const loc = { start: 0, end: 10 } as const;

describe('graphql-traverse', () => {
  describe('flattenSpreads', () => {
    it('should return an empty array when fields are undefined', () => {
      const result = flattenSpreads(undefined, {});
      expect(result).toEqual([]);
    });

    it('should return the same array when fields only contain GqlASTField objects', () => {
      const fields: GqlASTField[] = [
        {
          kind: 'Field',
          name: { kind: 'Name', value: 'field1', loc },
          arguments: [],
          directives: [],
          loc,
        },
      ];
      const result = flattenSpreads(fields, {});
      expect(result).toEqual(fields);
    });

    it('should resolve a single fragment spread and include its fields', () => {
      const fields: (GqlASTField | GqlASTFragmentSpread)[] = [
        {
          kind: 'FragmentSpread',
          name: { kind: 'Name', value: 'MyFragment', loc },
        },
      ];
      const fragments: Record<string, GqlASTFragmentDefinition> = {
        MyFragment: {
          kind: 'FragmentDefinition',
          name: { kind: 'Name', value: 'MyFragment', loc },
          typeCondition: null,
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: { kind: 'Name', value: 'field1', loc },
                arguments: [],
                directives: [],
                loc,
              },
            ],
            loc,
          },
          loc,
        },
      };
      const result = flattenSpreads(fields, fragments);
      expect(result).toEqual([
        {
          kind: 'Field',
          name: { kind: 'Name', value: 'field1', loc },
          arguments: [],
          directives: [],
          loc,
        },
      ]);
    });

    it('should resolve an inline fragment and include its fields', () => {
      const fields: (GqlASTField | GqlASTInlineFragmentSpread)[] = [
        {
          kind: 'InlineFragment',
          typeCondition: null,
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: { kind: 'Name', value: 'field1', loc },
                arguments: [],
                directives: [],
                loc,
              },
            ],
            loc,
          },
          loc,
        },
      ];
      const result = flattenSpreads(fields, {});
      expect(result).toEqual([
        {
          kind: 'Field',
          name: { kind: 'Name', value: 'field1', loc },
          arguments: [],
          directives: [],
          loc,
        },
      ]);
    });

    it('should handle nested fragment spreads', () => {
      const fields: (GqlASTField | GqlASTFragmentSpread)[] = [
        {
          kind: 'FragmentSpread',
          name: { kind: 'Name', value: 'OuterFragment', loc },
        },
      ];
      const fragments: Record<string, GqlASTFragmentDefinition> = {
        OuterFragment: {
          kind: 'FragmentDefinition',
          name: { kind: 'Name', value: 'OuterFragment', loc },
          typeCondition: null,
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'FragmentSpread',
                name: { kind: 'Name', value: 'InnerFragment', loc },
              },
            ],
            loc,
          },
          loc,
        },
        InnerFragment: {
          kind: 'FragmentDefinition',
          name: { kind: 'Name', value: 'InnerFragment', loc },
          typeCondition: null,
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: { kind: 'Name', value: 'field1', loc },
                arguments: [],
                directives: [],
                loc,
              },
            ],
            loc,
          },
          loc,
        },
      };
      const result = flattenSpreads(fields, fragments);
      expect(result).toEqual([
        {
          kind: 'Field',
          name: { kind: 'Name', value: 'field1', loc },
          arguments: [],
          directives: [],
          loc,
        },
      ]);
    });
  });

  describe('findGqlNodeByPath', () => {
    it('should throw "Programming Error: path.length < 1 in findByPath" if path is empty', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        loc,
      };

      expect(() => findGqlNodeByPath([], fieldNode, {})).toThrow(
        'Programming Error: path.length < 1 in findByPath'
      );
    });
  });

  describe('unpackSelectArgs', () => {
    it('should return the field node itself if no path is provided', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'field1', loc },
        arguments: [],
        directives: [],
        loc,
      };

      const result = unpackSelectArgs(undefined, fieldNode, {}, 'testField');
      expect(result.root).toEqual(fieldNode);
      expect(result.path).toBeUndefined();
      expect(result.skipSet).toBeUndefined();
    });

    it('should handle array as options, setting path correctly', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'nestedField', loc },
              arguments: [],
              directives: [],
              loc,
            },
          ],
          loc,
        },
        loc,
      };
      const pathArray = ['nestedField'];
      const result = unpackSelectArgs(pathArray, fieldNode, {}, 'rootField');
      expect(result.root).toEqual({
        kind: 'Field',
        name: { kind: 'Name', value: 'nestedField', loc },
        arguments: [],
        directives: [],
        loc,
      });
      expect(result.path).toEqual(pathArray);
    });

    it('should throw an error if the path does not exist in the field node or fragments', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        loc,
      };

      expect(() => unpackSelectArgs({ path: ['nonExistent'] }, fieldNode, {}, 'rootField')).toThrow(
        'Path "nonExistent" not found in rootField'
      );
    });

    it('should resolve a valid nested path within the field node', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'nestedField', loc },
              arguments: [],
              directives: [],
              loc,
            },
          ],
          loc,
        },
        loc,
      };

      const result = unpackSelectArgs({ path: ['nestedField'] }, fieldNode, {}, 'rootField');
      expect(result.root).toEqual({
        kind: 'Field',
        name: { kind: 'Name', value: 'nestedField', loc },
        arguments: [],
        directives: [],
        loc,
      });
      expect(result.path).toEqual(['nestedField']);
    });

    it('should resolve a fragment path and include the fragment fields', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'fieldWithFragment', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'FragmentSpread',
              name: { kind: 'Name', value: 'TestFragment', loc },
            },
          ],
          loc,
        },
        loc,
      };

      const fragments: Record<string, GqlASTFragmentDefinition> = {
        TestFragment: {
          kind: 'FragmentDefinition',
          name: { kind: 'Name', value: 'TestFragment', loc },
          typeCondition: null,
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: { kind: 'Name', value: 'fragmentField', loc },
                arguments: [],
                directives: [],
                loc,
              },
            ],
            loc,
          },
          loc,
        },
      };

      const result = unpackSelectArgs({ path: ['fragmentField'] }, fieldNode, fragments, 'fieldWithFragment');
      expect(result.root).toEqual({
        kind: 'Field',
        name: { kind: 'Name', value: 'fragmentField', loc },
        arguments: [],
        directives: [],
        loc,
      });
    });

    it('should handle skipSet and check function for subpath filtering', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'subField', loc },
              arguments: [],
              directives: [],
              loc,
            },
          ],
          loc,
        },
        loc,
      };

      const options = {
        skip: ['rootField.subField'],
        check: jest.fn((path: string) => path !== 'rootField.subField'),
      };

      const result = unpackSelectArgs(options, fieldNode, {}, 'rootField');

      expect(
        result.getCheckedSubpath('rootField', {
          kind: 'Field',
          name: { kind: 'Name', value: 'subField', loc },
          arguments: [],
          directives: [],
          loc,
        })
      ).toBeUndefined();
    });

    it('should use the check function to filter subpaths', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'includedField', loc },
              arguments: [],
              directives: [],
              loc,
            },
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'excludedField', loc },
              arguments: [],
              directives: [],
              loc,
            },
          ],
          loc,
        },
        loc,
      };

      const checkFn = jest.fn((subPath: string) => subPath !== 'rootField.excludedField');

      const options = {
        check: checkFn,
      };

      const result = unpackSelectArgs(options, fieldNode, {}, 'rootField');

      const includedField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'includedField', loc },
        arguments: [],
        directives: [],
        loc,
      } as const;
      const excludedField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'excludedField', loc },
        arguments: [],
        directives: [],
        loc,
      } as const;

      expect(result.getCheckedSubpath('rootField', includedField)).toBe('rootField.includedField');
      expect(result.getCheckedSubpath('rootField', excludedField)).toBeUndefined();
      expect(checkFn).toHaveBeenCalledWith('rootField.includedField', includedField);
      expect(checkFn).toHaveBeenCalledWith('rootField.excludedField', excludedField);
    });

    it('should merge additional properties with the returned object', () => {
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'testField', loc },
        arguments: [],
        directives: [],
        loc,
      };

      const additionalProperties = { customProp: 'customValue' };

      const result = unpackSelectArgs(additionalProperties, fieldNode, {}, 'testField');
      expect(result.root).toEqual(fieldNode);
      expect(result.customProp).toBe('customValue');
    });
  });

  describe('collectRecursiveSelectionPair', () => {
    it('should return undefined when getCheckedSubpath returns undefined', () => {
      const getCheckedSubpath = jest.fn(() => undefined);
      const recur = jest.fn();
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'exampleField', loc },
        arguments: [],
        directives: [],
        loc,
      };
      const result = collectRecursiveSelectionPair('path', fieldNode, getCheckedSubpath, {}, recur);
      expect(result).toBeUndefined();
      expect(getCheckedSubpath).toHaveBeenCalledWith('path', fieldNode);
      expect(recur).not.toHaveBeenCalled();
    });

    it('should return [name, result] when getCheckedSubpath returns a value and recur is valid', () => {
      const getCheckedSubpath = jest.fn(() => 'subpath');
      const recur = jest.fn(() => 'recurResult');
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'exampleField', loc },
        arguments: [],
        directives: [],
        selectionSet: { kind: 'SelectionSet', selections: [], loc } as GqlASTSelectionSet,
        loc,
      };
      const result = collectRecursiveSelectionPair('path', fieldNode, getCheckedSubpath, {}, recur);
      expect(result).toEqual(['exampleField', 'recurResult']);
      expect(getCheckedSubpath).toHaveBeenCalledWith('path', fieldNode);
      expect(recur).toHaveBeenCalledWith(
        fieldNode.selectionSet?.selections,
        'subpath',
        getCheckedSubpath,
        {}
      );
    });

    it('should resolve inline fragments with valid selections using fragments', () => {
      const getCheckedSubpath = jest.fn(() => 'subpath');
      const recur = jest.fn(() => 'resolvedInlineFragment');
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'inlineField', loc },
        arguments: [],
        directives: [],
        selectionSet: { kind: 'SelectionSet', selections: [], loc } satisfies GqlASTSelectionSet,
        loc,
      };
      const fragments: Record<string, GqlASTFragmentDefinition> = {
        ExampleFragment: {
          kind: 'FragmentDefinition',
          name: { kind: 'Name', value: 'ExampleFragment', loc },
          typeCondition: null,
          directives: [],
          selectionSet: { kind: 'SelectionSet', selections: [], loc } satisfies GqlASTSelectionSet,
          loc,
        },
      };

      const result = collectRecursiveSelectionPair('path', fieldNode, getCheckedSubpath, fragments, recur);
      expect(result).toEqual(['inlineField', 'resolvedInlineFragment']);
      expect(recur).toHaveBeenCalledWith(
        fieldNode.selectionSet?.selections,
        'subpath',
        getCheckedSubpath,
        fragments
      );
    });

    it('should process deeply nested selections and resolve them correctly', () => {
      const getCheckedSubpath = jest.fn((path: string) => (path === 'path' ? 'nestedSubpath' : undefined));
      const recur = jest.fn((selections, subpath) =>
        subpath === 'nestedSubpath' ? 'nestedResult' : 'result'
      );
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'rootField', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'nestedField', loc },
              arguments: [],
              directives: [],
              loc,
            },
          ],
          loc,
        } satisfies GqlASTSelectionSet,
        loc,
      };

      const result = collectRecursiveSelectionPair('path', fieldNode, getCheckedSubpath, {}, recur);
      expect(result).toEqual(['rootField', 'nestedResult']);
      expect(recur).toHaveBeenCalledWith(
        fieldNode.selectionSet?.selections,
        'nestedSubpath',
        getCheckedSubpath,
        {}
      );
    });

    it('should correctly invoke recur with proper parameters for selection sets', () => {
      const getCheckedSubpath = jest.fn(() => 'validSubpath');
      const recur = jest.fn(() => 'processedResult');
      const fieldNode: GqlASTField = {
        kind: 'Field',
        name: { kind: 'Name', value: 'testField', loc },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: 'subField', loc },
              arguments: [],
              directives: [],
              loc,
            },
          ],
          loc,
        },
        loc,
      };

      collectRecursiveSelectionPair('rootPath', fieldNode, getCheckedSubpath, {}, recur);
      expect(recur).toHaveBeenCalledWith(
        fieldNode.selectionSet?.selections,
        'validSubpath',
        getCheckedSubpath,
        {}
      );
    });
  });
});
