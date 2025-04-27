var assert = require('assert');

module.exports = {
            
    error(message_substring, f){
        var fail = false;
        try {
            f();
            fail = true;
        } catch (e) {
            if (e.toString().indexOf(message_substring) === -1) {
                throw new Error("expecting " + message_substring);
            }
        }
        if (fail) {
            throw new Error("expecting " + message_substring);
        }
    }
}

// Add a test to make Jest happy
describe('test_helper functions', () => {
    test('error function catches errors with expected message', () => {
        const helper = module.exports;
        // This should not throw
        helper.error("test error", () => {
            throw new Error("test error");
        });
        
        // Verify it throws when expected substring is not found
        expect(() => {
            helper.error("wrong message", () => {
                throw new Error("test error");
            });
        }).toThrow("expecting wrong message");
        
        // Verify it throws when no error occurs
        expect(() => {
            helper.error("should error", () => {
                // Do nothing
            });
        }).toThrow("expecting should error");
    });
});