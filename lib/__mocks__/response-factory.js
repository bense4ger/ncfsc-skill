const mockFactory = jest.genMockFromModule('../response-factory');

mockFactory._fakeResponse = '';

Object.defineProperty(mockFactory, 'fakeResponse', {
    get: function () { return this._fakeResponse; },
    set: function (value) { this._fakeResponse = value; }
});

mockFactory.createResponse = function () {
    return this._fakeResponse;
};

module.exports = mockFactory;