import React, { useState, useEffect, useRef } from 'react';
import portfolioData from '../../public/data.json';
import '../css/TerminalPortfolio.css';
import ASCII_art from './ASCII_art';

const TerminalPortfolio = () => {
  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath] = useState('~');
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    document.title = "beesee.... Z z z";
  }, []);

  useEffect(() => {
    const initialOutput = [
      { text: 'System initialized successfully...', className: 'success', id: 'init-1' },
      { text: 'Loading portfolio data...', className: 'info', id: 'init-2' },
      { text: 'Ready for commands!', className: 'success', id: 'init-3' },
      { text: '', className: '', id: 'init-4' },
      { text: "Type <span class=\"command\">'help'</span> to see available commands.", className: '', id: 'init-5' },
      { text: "Type <span class=\"command\">'about'</span> to learn more about me.", className: '', id: 'init-6' },
      { text: '', className: '', id: 'init-7' }
    ];
    setOutput(initialOutput);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [output]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [output]);

  const replacePlaceholders = (text) => {
    return text
      .replace(/{name}/g, portfolioData.profile.name)
      .replace(/{experience}/g, portfolioData.profile.experience)
      .replace(/{currentFocus}/g, portfolioData.profile.currentFocus)
      .replace(/{location}/g, portfolioData.profile.location)
      .replace(/{status}/g, portfolioData.profile.status)
      .replace(/{email}/g, portfolioData.contact.email)
      .replace(/{github}/g, portfolioData.contact.github)
      .replace(/{linkedin}/g, portfolioData.contact.linkedin)
      .replace(/{website}/g, portfolioData.contact.website)
      .replace(/{phone}/g, portfolioData.contact.phone)
      .replace(/{resume}/g, portfolioData.contact.resume);
  };

  const processCommandOutput = (commandData) => {
    return commandData.map((line, index) => ({
      text: replacePlaceholders(line.text),
      className: line.className,
      id: `cmd-${Date.now()}-${index}`
    }));
  };

  const addOutputWithDelay = (lines, delay = 0) => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
      }, index * delay);
    });
  };

  const executeCommand = (command) => {
    if (!command.trim()) return;

    const commandOutput = [
      { text: `sabina@portfolio:${currentPath}$ ${command}`, className: 'prompt' }
    ];

    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    const [cmd, ...args] = command.trim().split(' ');
    const commandResult = handleCommand(cmd.toLowerCase(), args);
    
    setOutput(prev => [...prev, ...commandOutput, ...commandResult]);
    setCurrentInput('');
  };

  const handleCommand = (cmd, args) => {
    switch (cmd) {
      case 'help':
        return [
          ...processCommandOutput(portfolioData.commands.help.output),
          { text: '', className: '', id: 'help-spacer-1' },
          { text: '<span class="warning">🎮 Fun commands (try them!):</span>', className: '', id: 'help-fun-header' },
          { text: '<span class="help-command">matrix</span>    - Enter the Matrix', className: '', id: 'help-matrix' },
          { text: '<span class="help-command">hack</span>      - Fake hacking sequence', className: '', id: 'help-hack' },
          { text: '<span class="help-command">cowsay</span>    - Make the cow talk', className: '', id: 'help-cowsay' },
          { text: '<span class="help-command">sl</span>        - Steam locomotive', className: '', id: 'help-sl' },
          { text: '<span class="help-command">tree</span>      - Show directory tree', className: '', id: 'help-tree' },
          { text: '<span class="help-command">sudo</span>      - Try to get root access', className: '', id: 'help-sudo' },
          { text: '<span class="help-command">vim</span>       - Start vim editor', className: '', id: 'help-vim' },
          { text: '<span class="help-command">fortune</span>   - Get your fortune', className: '', id: 'help-fortune' },
          { text: '<span class="help-command">joke</span>      - Random programming joke', className: '', id: 'help-joke' },
          { text: '<span class="help-command">secret</span>    - Find the secret', className: '', id: 'help-secret' },
          { text: '', className: '', id: 'help-spacer-2' },
          { text: '<span class="info">💡 Tip: Try some classic Unix commands and see what happens!</span>', className: '', id: 'help-tip' }
        ];

      case 'about':
        return processCommandOutput(portfolioData.commands.about.output);

      case 'projects':
        const projectsOutput = [...processCommandOutput(portfolioData.commands.projects.header)];

        portfolioData.projects.forEach((project, index) => {
          projectsOutput.push({
            text: `<div class="project-item">
              <div class="project-title">${project.title}</div>
              <div class="project-desc">${project.desc}</div>
              <div class="project-tech">${project.tech}</div>
              <a href="${project.github}" style="color: #8be9fd; text-decoration: none;" target="_blank">🔗 ${project.github}</a>
            </div>`,
            className: '',
            id: `project-${index}`
          });
        });

        projectsOutput.push(...processCommandOutput(portfolioData.commands.projects.footer));
        return projectsOutput;

      case 'skills':
        const skillsOutput = [...processCommandOutput(portfolioData.commands.skills.header)];

        Object.entries(portfolioData.skills).forEach(([category, skills]) => {
          skillsOutput.push({ 
            text: `<span class="info">${category.charAt(0).toUpperCase() + category.slice(1)}:</span>`, 
            className: '',
            id: `skill-cat-${category}`
          });
          skills.forEach((skill, index) => {
            const progressBar = '█'.repeat(Math.floor(skill.level / 5)) + '░'.repeat(20 - Math.floor(skill.level / 5));
            skillsOutput.push({
              text: `  ▪ ${skill.name.padEnd(20)} ${progressBar} ${skill.level}%`,
              className: 'success',
              id: `skill-${category}-${index}`
            });
          });
          skillsOutput.push({ text: '', className: '', id: `skill-spacer-${category}` });
        });

        return skillsOutput;

      case 'experience':
        const expOutput = [...processCommandOutput(portfolioData.commands.experience.header)];

        portfolioData.experience.forEach((exp, expIndex) => {
          expOutput.push({
            text: `<span class="success">${exp.position}</span> @ ${exp.company}`,
            className: 'info',
            id: `exp-title-${expIndex}`
          });
          expOutput.push({
            text: `<span class="warning">${exp.period}</span>`,
            className: 'warning',
            id: `exp-period-${expIndex}`
          });
          exp.responsibilities.forEach((resp, respIndex) => {
            expOutput.push({ 
              text: `  • ${resp}`, 
              className: '',
              id: `exp-resp-${expIndex}-${respIndex}`
            });
          });
          expOutput.push({ text: '', className: '', id: `exp-spacer-${expIndex}` });
        });

        return expOutput;

      case 'contact':
        return processCommandOutput(portfolioData.commands.contact.output);

      case 'clear':
        setOutput([]);
        return [];

      case 'ls':
        return processCommandOutput(portfolioData.commands.ls.output);

      case 'cat':
        const filename = args[0];
        if (!filename) {
          return [{ text: 'Usage: cat <filename>', className: 'error', id: 'cat-usage' }];
        }
        if (portfolioData.files[filename]) {
          return [
            { text: '', className: 'info', id: 'cat-spacer-1' },
            { text: `📄 Contents of ${filename}:`, className: 'info', id: 'cat-header' },
            { text: '─'.repeat(50), className: 'info', id: 'cat-separator-1' },
            { text: portfolioData.files[filename], className: 'success', id: 'cat-content' },
            { text: '─'.repeat(50), className: 'info', id: 'cat-separator-2' }
          ];
        } else {
          return [{ text: `cat: ${filename}: No such file or directory`, className: 'error', id: 'cat-error' }];
        }

      case 'whoami':
        return processCommandOutput(portfolioData.commands.whoami.output);

      case 'pwd':
        return [{ text: `/home/sabina${currentPath}`, className: 'info', id: 'pwd-output' }];

      case 'date':
        return [{ text: new Date().toString(), className: 'info', id: 'date-output' }]; 

      case 'echo':
        return [{ text: args.join(' '), className: 'success', id: 'echo-output' }];

      case 'joke':
        const randomJoke = portfolioData.easterEggs.jokes[Math.floor(Math.random() * portfolioData.easterEggs.jokes.length)];
        return [
          { text: '', className: 'info', id: 'joke-spacer-1' },
          { text: '😄 Here\'s a programming joke for you:', className: 'warning', id: 'joke-header' },
          { text: '', className: '', id: 'joke-spacer-2' },
          { text: randomJoke, className: 'success', id: 'joke-content' },
          { text: '', className: '', id: 'joke-spacer-3' },
          { text: '*ba dum tss* 🥁', className: 'info', id: 'joke-footer' }
        ];

      case 'fortune':
        const randomFortune = portfolioData.easterEggs.fortunes[Math.floor(Math.random() * portfolioData.easterEggs.fortunes.length)];
        return [
          { text: '', className: 'info', id: 'fortune-spacer-1' },
          { text: 'Your fortune:', className: 'warning', id: 'fortune-header' },
          { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', className: 'warning', id: 'fortune-separator-1' },
          { text: `"${randomFortune}"`, className: 'success', id: 'fortune-content' },
          { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', className: 'warning', id: 'fortune-separator-2' }
        ];

      case 'coffee':
        return processCommandOutput(portfolioData.commands.coffee.output);

      case 'matrix':
        setTimeout(() => {
          const matrixLines = [
            { text: 'Initializing Matrix...', className: 'success', id: 'matrix-init' },
            { text: '', className: '', id: 'matrix-spacer-1' },
            { text: '█▓▒░01001000 01100101 01101100 01101100 01101111░▒▓█', className: 'success', id: 'matrix-1' },
            { text: '█▓▒░01010111 01101111 01110010 01101100 01100100░▒▓█', className: 'success', id: 'matrix-2' },
            { text: '█▓▒░01001001 00100000 01100001 01101101 00100000░▒▓█', className: 'success', id: 'matrix-3' },
            { text: '█▓▒░01001010 01101111 01101000 01101110 00100001░▒▓█', className: 'success', id: 'matrix-4' },
            { text: '█▓▒░Wake up, Neo... The Matrix has you...░▒▓█', className: 'success', id: 'matrix-5' },
            { text: '█▓▒░Follow the white rabbit 🐰░▒▓█', className: 'success', id: 'matrix-6' }
          ];
          
          addOutputWithDelay(matrixLines, 500);
          
          setTimeout(() => {
            setOutput(prev => [...prev, 
              { text: '', className: '', id: 'matrix-end-spacer' },
              { text: 'Connection terminated by Agent Smith', className: 'error', id: 'matrix-end' }
            ]);
          }, matrixLines.length * 500 + 1000);
        }, 100);
        
        return [{ text: '', className: 'info', id: 'matrix-start' }];

      case 'hack':
        setTimeout(() => {
          const hackSteps = [
            { text: 'INITIATING HACK SEQUENCE...', className: 'warning', id: 'hack-init' },
            { text: '', className: '', id: 'hack-spacer' },
            { text: 'Scanning for vulnerabilities... ████████████████████ 100%', className: 'success', id: 'hack-1' },
            { text: 'Bypassing firewall... ████████████████████ 100%', className: 'success', id: 'hack-2' },
            { text: 'Cracking encryption... ████████████████████ 100%', className: 'success', id: 'hack-3' },
            { text: 'Accessing mainframe... ████████████████████ 100%', className: 'success', id: 'hack-4' },
            { text: 'Downloading files... ████████████████████ 100%', className: 'success', id: 'hack-5' },
            { text: 'Covering tracks... ████████████████████ 100%', className: 'success', id: 'hack-6' }
          ];
          
          addOutputWithDelay(hackSteps, 800);
          
          setTimeout(() => {
            setOutput(prev => [...prev, 
              { text: '', className: '', id: 'hack-end-spacer-1' },
              { text: '🎯 HACK COMPLETE!', className: 'success', id: 'hack-complete' },
              { text: 'Just kidding! HEHE GOTCHU', className: 'warning', id: 'hack-joke' },
              { text: 'No systems were harmed in the making of this portfolio', className: 'info', id: 'hack-disclaimer' }
            ]);
          }, hackSteps.length * 800 + 1000);
        }, 100);
        
        return [{ text: '', className: 'info', id: 'hack-start' }];

      case 'cowsay':
        const message = args.length > 0 ? args.join(' ') : 'Hello from the terminal!';
        const messageLength = message.length;
        const topBorder = ' ' + '_'.repeat(messageLength + 2);
        const bottomBorder = ' ' + '-'.repeat(messageLength + 2);

        return [
          { text: '', className: 'info', id: 'cowsay-spacer-1' },
          { text: topBorder, className: 'success', id: 'cowsay-top' },
          { text: `< ${message} >`, className: 'success', id: 'cowsay-message' },
          { text: bottomBorder, className: 'success', id: 'cowsay-bottom' },
          { text: '        \\   ^__^', className: 'success', id: 'cowsay-1' },
          { text: '         \\  (oo)\\_______', className: 'success', id: 'cowsay-2' },
          { text: '            (__)\\       )\\/\\', className: 'success', id: 'cowsay-3' },
          { text: '                ||----w |', className: 'success', id: 'cowsay-4' },
          { text: '                ||     ||', className: 'success', id: 'cowsay-5' },
          { text: '', className: '', id: 'cowsay-spacer-2' },
          { text: '🐄 Moo! Try "cowsay your message here"', className: 'info', id: 'cowsay-tip' }
        ];

      case 'sl':
        return [
          { text: '', className: 'info', id: 'sl-spacer-1' },
          { text: '🚂 Choo choo! Here comes the train...', className: 'warning', id: 'sl-choo' },
          { text: '', className: '', id: 'sl-spacer-2' },
          { text: '      ====        ________                ___________ ', className: 'success', id: 'sl-1' },
          { text: '  _D _|  |_______/        \\__I_I_____===__|_________| ', className: 'success', id: 'sl-2' },
          { text: '   |(_)---  |   H\\________/ |   |        =|___ ___|   ', className: 'success', id: 'sl-3' },
          { text: '   /     |  |   H  |  |     |   |         ||_| |_||   ', className: 'success', id: 'sl-4' },
          { text: '  |      |  |   H  |__--------------------| [___] |   ', className: 'success', id: 'sl-5' },
          { text: '  | ________|___H__/__|_____/[][]~\\_______|       |   ', className: 'success', id: 'sl-6' },
          { text: '  |/ |   |-----------I_____I [][] []  D   |=======|__ ', className: 'success', id: 'sl-7' },
          { text: '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ', className: 'success', id: 'sl-8' },
          { text: ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ', className: 'success', id: 'sl-9' },
          { text: '  \\_/      \\O=====O=====O=====O_/      \\_/            ', className: 'success', id: 'sl-10' },
          { text: '', className: '', id: 'sl-spacer-3' },
          { text: 'You meant "ls" didn\'t you? 😄', className: 'info', id: 'sl-joke' },
          { text: '(This is a classic Unix joke command)', className: 'info', id: 'sl-explanation' }
        ];

      case 'tree':
        return [
          { text: '', className: 'info', id: 'tree-spacer-1' },
          { text: '📂 Portfolio Structure:', className: 'info', id: 'tree-header' },
          { text: '', className: '', id: 'tree-spacer-2' },
          { text: 'portfolio/', className: 'success', id: 'tree-root' },
          { text: '├── 📁 projects/', className: 'info', id: 'tree-projects' },
          { text: '│   ├── 🛒 ecommerce-platform/', className: 'success', id: 'tree-ecommerce' },
          { text: '│   ├── 📊 analytics-dashboard/', className: 'success', id: 'tree-analytics' },
          { text: '│   ├── 📱 weather-app/', className: 'success', id: 'tree-weather' },
          { text: '│   └── 🔐 auth-service/', className: 'success', id: 'tree-auth' },
          { text: '├── 📁 skills/', className: 'info', id: 'tree-skills' },
          { text: '│   ├── frontend.js', className: 'success', id: 'tree-frontend' },
          { text: '│   ├── backend.py', className: 'success', id: 'tree-backend' },
          { text: '│   └── devops.yml', className: 'success', id: 'tree-devops' },
          { text: '├── 📁 experience/', className: 'info', id: 'tree-experience' },
          { text: '│   ├── company1.md', className: 'success', id: 'tree-company1' },
          { text: '│   ├── company2.md', className: 'success', id: 'tree-company2' },
          { text: '│   └── company3.md', className: 'success', id: 'tree-company3' },
          { text: '├── 📄 README.md', className: 'success', id: 'tree-readme' },
          { text: '├── 📄 resume.pdf', className: 'success', id: 'tree-resume' },
          { text: '└── 📄 projects.json', className: 'success', id: 'tree-json' },
          { text: '', className: '', id: 'tree-spacer-3' }
        ];

      case 'sudo':
        const sudoResponses = [
          'Nice try! But you\'re not root here 😏',
          'sudo: user is not in the sudoers file. This incident will be reported.',
          'With great power comes great responsibility... which you don\'t have.',
          'Access denied. Maybe try saying "please"?',
          'Sorry, this is a demo portfolio, not a real terminal!'
        ];
        const randomSudoResponse = sudoResponses[Math.floor(Math.random() * sudoResponses.length)];
        return [{ text: randomSudoResponse, className: 'error', id: 'sudo-response' }];

      case 'vim':
        setTimeout(() => {
          const vimLines = [
            { text: 'Starting vim...', className: 'info', id: 'vim-start' },
            { text: '', className: '', id: 'vim-spacer-1' },
            { text: 'Help! I\'m trapped in vim!', className: 'error', id: 'vim-trapped' },
            { text: 'How do I exit this thing?!', className: 'error', id: 'vim-help' },
            { text: '', className: '', id: 'vim-spacer-2' },
            { text: 'Just kidding! Everyone knows you use :q! to exit', className: 'success', id: 'vim-joke' },
            { text: '(But seriously, VS Code is my editor of choice)', className: 'info', id: 'vim-preference' }
          ];
          
          setOutput(prev => [...prev, ...vimLines]);
        }, 2000);
        
        return [{ text: '', className: 'info', id: 'vim-init' }];

      case 'secret':
        return [
          { text: '', className: 'info', id: 'secret-spacer-1' },
          { text: '🤐 You found the secret command!', className: 'success', id: 'secret-found' },
          { text: '', className: '', id: 'secret-spacer-2' },
          { text: '🎉 Congratulations! You\'re a true explorer!', className: 'success', id: 'secret-congrats' },
          { text: '', className: '', id: 'secret-spacer-3' },
          { text: '🏆 Achievement Unlocked: Terminal Detective', className: 'warning', id: 'secret-achievement' },
          { text: '', className: '', id: 'secret-spacer-4' },
          { text: 'Here are some hidden stats about this portfolio:', className: 'info', id: 'secret-stats-header' },
          { text: '📊 Commands available: 20+', className: 'info', id: 'secret-commands' },
          { text: '📈 Lines of code: ~500+', className: 'info', id: 'secret-lines' },
          { text: '☕ Cups of coffee consumed: ∞', className: 'info', id: 'secret-coffee' },
          { text: '🎯 Easter eggs found: 1/10', className: 'info', id: 'secret-eggs' },
          { text: '', className: '', id: 'secret-spacer-5' },
          { text: 'Keep exploring! There might be more secrets... 👀', className: 'warning', id: 'secret-hint' }
        ];

      default:
        return [{ text: `Command not found: ${cmd}. Type 'help' for available commands.`, className: 'error', id: 'cmd-not-found' }];
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = ['help', 'about', 'projects', 'skills', 'experience', 'contact', 'clear', 'ls', 'cat', 'whoami', 'pwd', 'date', 'echo', 'joke', 'fortune', 'coffee', 'matrix', 'hack', 'cowsay', 'sl', 'tree', 'sudo', 'vim', 'secret'];
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput(prev => [...prev, 
          { text: '', className: '', id: 'tab-spacer' },
          { text: 'Available completions:', className: 'info', id: 'tab-header' },
          ...matches.map((match, index) => ({
            text: `  ${match}`,
            className: 'success',
            id: `tab-match-${index}`
          }))
        ]);
      }
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="btn btn-close"></div>
          <div className="btn btn-minimize"></div>
          <div className="btn btn-maximize"></div>
        </div>
        <div className="terminal-title">sabina@portfolio:~$</div>
      </div>

      <div className="terminal-body" ref={terminalBodyRef}>
        <ASCII_art />
        {output.map((line) => (
          <div key={line.id} className={`output-line ${line.className}`} dangerouslySetInnerHTML={{ __html: line.text }} />
        ))}

        <div className="input-line">
          <span className="input-prompt">sabina@portfolio:~$</span>
          <input
            className='input-field'
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f1fa8c',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              outline: 'none',
              flex: 1,
              caretColor: '#50fa7b',
              marginLeft: '8px'
            }}
          />
          <span className="cursor"></span>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;