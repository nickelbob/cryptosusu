App = {
  web3Provider: null,
  contracts: {},
  myAccount: '',

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      myAccount = accounts[0];
    });

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Susu.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var SusuContractArtifact = data;
      App.contracts.Susu = TruffleContract(SusuContractArtifact);

      // Set the provider for our contract
      App.contracts.Susu.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-setMe', App.setMe);
    $(document).on('click', '.btn-send', App.send);
    $(document).on('click', '.btn-getRecip', App.getRecip);
    $(document).on('click', '.btn-getMoolah', App.getMoolah);
    $(document).on('click', '.btn-giveMoolah', App.giveMoolah);
  },

  send: function(event) {
    event.preventDefault();

    App.contracts.Susu.deployed().then(function(instance) {
      instance.sendTransaction({
        from: myAccount,
        to: "0x461113f2AaE7284649cC53Ba5761668C82Dd587c",
        value: web3.toWei(0.5, 'ether'),
        gas: 210000,
        gasPrice: 20000000000
      });
    }).then(function(result) {
      return console.log('send SUCCUSS! result:', result);
    }).catch(function(err) {
      console.error('error:', err.message);
    });
  },

  confirmPurchase: function(event) {
    event.preventDefault();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Susu.deployed().then(function(instance) {
        // return instance.giveMoolah.sendTransaction({dst:0x461113f2AaE7284649cC53Ba5761668C82Dd587c, howMuch:12345600000});
        return instance.setRecip.sendTransaction(account);
      }).then(function(result) {
        return console.log('SUCCUSS! result:', result);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  setMe: function(event) {
    event.preventDefault();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Susu.deployed().then(function(instance) {
        return instance.setRecip.sendTransaction(account);
      }).then(function(result) {
        return console.log('setRecip SUCCUSS! result:', result);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getRecip: function(event) {
    event.preventDefault();

    App.contracts.Susu.deployed().then(function(instance) {
      return instance.recipient.call();
    }).then(function(result) {
      return console.log('getRecip SUCCUSS! result:', result);
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  getMoolah: function(event) {
    event.preventDefault();

    App.contracts.Susu.deployed().then(function(instance) {
      return instance.howMuch.call();
    }).then(function(result) {
      return console.log('getMoolah SUCCUSS! result:', result);
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  giveMoolah: function(event) {
    event.preventDefault();

    App.contracts.Susu.deployed().then(function(instance) {
      return instance.giveMoolah.sendTransaction({gas:100000, gasPrice:1});
    }).then(function(result) {
      return console.log('getMoolah SUCCUSS! result:', result);
    }).catch(function(err) {
      console.log(err.message);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
