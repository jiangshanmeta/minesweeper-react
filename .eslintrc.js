module.exports = {
    root: true,
    "extends": ["react-app"],
    rules: {
        'indent': [
            'error', 4,
        ],
        'comma-dangle': [
            'error', {
                'arrays': 'always',
                'objects': 'always',
                'imports': 'always',
                'exports': 'always',
                'functions': 'never',
            },
        ],
        'array-bracket-newline': [
            'error', {
                minItems: 1,
            },
        ],
        'object-curly-newline': [
            'error', {
                minProperties: 1,
            },
        ],
        'object-property-newline': [
            'error', {
                allowAllPropertiesOnSameLine: false,
            },
        ],
        'no-console': 'off',
        'no-debugger': 'error',
        'semi': [
            'error', 'always',
        ],
        'standard/no-callback-literal': 'off',
        'camelcase': 'off',
    },

}