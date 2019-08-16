/*
 * @description 										Convert Member Expression To Function in the given input file
 * @param {Object} fileInfo 				Input Source File
 * @param {Object} api							Input Code Shift API File
 */
module.exports = (fileInfo, api) => {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	
	// Argument to find Member Expression
	const ARGUMENTS = 'Constants';

	/*
	 * @method 												ConvertMemberExpressionToFunction
	 * @description 									Convert Member Expression To Function
	 * @param {Object} path 					Input Path Node
	 * @return {Object} replacedNode	Replaced Path Node
	 */
	const ConvertMemberExpressionToFunction = path => {
		let pathName = '',
				pathObjectName = path.value.object.name,
				mePath = path;

		// Iterate till parent node `MemberExpression` to construct the memberpath
		while (mePath.value.type === "MemberExpression") {
			if (mePath.value.property.name) {
				if (pathName) {
					pathName += '.';
				}
				pathName += mePath.value.property.name;
			}
			path = mePath;
			mePath = mePath.parent;
		}

		// Replace the ARGUMENTS with call expression to memberpath
		if (pathObjectName === ARGUMENTS) {
			console.log(`Converted ${pathObjectName}.${pathName} => ${pathObjectName}.fetch("${pathName}")`);
			return j(path).replaceWith(`${pathObjectName}.fetch("${pathName}")`);
		}
	};

	// Find Member Expression Matched the ARGUMENTS
	return root.find(j.MemberExpression, {
		object: { 
			name: ARGUMENTS
	  }
	}).forEach(ConvertMemberExpressionToFunction).toSource();
};