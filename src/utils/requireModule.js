module.exports = async function requireModule(moduleName) {
  if (typeof moduleName !== 'string') {
    throw new Error('ModuleName must be a string');
  }

  try {
    return await import(moduleName);
  } catch (error) {
    throw new Error(`Failed to import module ${moduleName}: ${error}`);
  }
};