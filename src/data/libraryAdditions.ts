import {
  ADDED_FEATURES as BASE_FEATURES,
  ADDED_MODULES as BASE_MODULES,
  ADDED_TEST_CASES as BASE_TEST_CASES,
} from './masterLibraryAdditions'
import {
  ADDED_FEATURES as AI_FEATURES,
  ADDED_MODULES as AI_MODULES,
  ADDED_TEST_CASES as AI_TEST_CASES,
} from './aiCategoriesAdditions'

/**
 * Everything contributed on top of the generated catalog, from every export, merged into one
 * place. Add another exported file by importing it here — nothing else needs to change.
 */
export const ADDED_MODULES = [...BASE_MODULES, ...AI_MODULES]
export const ADDED_FEATURES = [...BASE_FEATURES, ...AI_FEATURES]
export const ADDED_TEST_CASES = [...BASE_TEST_CASES, ...AI_TEST_CASES]
