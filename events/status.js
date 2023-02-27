module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const currencies = ['Moeda', 'Coin', 'Moneda', '通貨', '货币', 'валюта', 'sikka', 'dongjeon'];
        let currentIndex = -1;
        let previousIndex = -1;
        
        setInterval(() => {
          do {
            currentIndex = Math.floor(Math.random() * currencies.length);
          } while (currentIndex === previousIndex);
          
          client.user.setActivity(currencies[currentIndex], { type: 'COMPETING' });
          previousIndex = currentIndex;
        }, 20000);
      console.log(`
          ================================================
                                    |
              ╱╱╱╱╱╱╱╱╭╮╭━━━┳━━━╮   |
              ╱╱╱╱╱╱╱╱┃┃┃╭━╮┃╭━╮┃   |   - Status: Online
              ╭━━┳━━┳━┫┃┃┃╱┃┃╰━━╮   |   - User: ${client.user.username}
              ┃╭━┫╭╮┃╭┫┃┃┃╱┃┣━━╮┃   |   - Commands: ${client.commands.size}
              ┃╰━┫╭╮┃┃┃╰┫╰━╯┃╰━╯┃   |
              ╰━━┻╯╰┻╯╰━┻━━━┻━━━╯   |
          ================================================
          `);
    },
};
  