const mock = jest.genMockFromModule('../logger');
mock.log = jest.fn(() => {});

module.exports = mock;