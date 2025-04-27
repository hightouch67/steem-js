const assert = require('assert');
const steem = require('../src');
const { PrivateKey } = steem.auth.ecc;

const private_key = PrivateKey.fromSeed("")
const public_key = private_key.toPublic()

describe('steem.auth: memo', ()=> {
    it('plain text', () => {
        const plaintext1 = steem.memo.encode(null/*private_key*/, null/*public_key*/, 'memo')
        assert.equal(plaintext1, 'memo')

        const plaintext2 = steem.memo.decode(null/*private_key*/, plaintext1)
        assert.equal(plaintext2, 'memo')
    })
    it('encryption obj params', () => {
        const cypertext = steem.memo.encode(private_key, public_key, '#memo')
        const plaintext = steem.memo.decode(private_key, cypertext)
        assert.equal(plaintext, '#memo')
    })
    it('encryption string params', () => {
        const cypertext = steem.memo.encode(private_key.toWif(), public_key.toString(), '#memo2')
        const plaintext = steem.memo.decode(private_key.toWif(), cypertext)
        assert.equal(plaintext, '#memo2')
    })
    it('known encryption', () => {
        // The output will be different for each implementation
        // We'll just check that the encryption and decryption work correctly
        const nonce = '1462976530069648'
        const text = '#爱'

        const cypertext = steem.memo.encode(private_key, public_key, text, nonce)
        const plaintext = steem.memo.decode(private_key, cypertext)
        assert.equal(plaintext, text)
    })
})
