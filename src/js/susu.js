App = {
  web3Provider: null,
  contracts: {},

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
    $(document).on('click', '.btn-confirmPurchase', App.confirmPurchase);
  },

  confirmPurchase: function(event) {
    event.preventDefault();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Susu.deployed().then(function(instance) {
        console.log('instance:',instance);
        return instance.confirmPurchase({
          from: account,
          value: 1000000000000000,
          gas: 4712388,
          gasPrice: 1,
        });
      }).then(function(result) {
        return console.log('SUCCUSS! result:', result);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

  /*
    markAdopted: function(adopters, account) {
      var adoptionInstance;

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      }).then(function(adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
            $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    },

    handleAdopt: function(event) {
      event.preventDefault();

      var petId = parseInt($(event.target).data('id'));

      var adoptionInstance;

      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }

        var account = accounts[0];

        App.contracts.Adoption.deployed().then(function(instance) {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, {from: account});
        }).then(function(result) {
          return App.markAdopted();
        }).catch(function(err) {
          console.log(err.message);
        });
      });
    }
  */
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
