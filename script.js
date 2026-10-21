'use strict';
const hamburger=document.getElementById('hamburger'),navMenu=document.getElementById('nav-menu');
const mobileMenuQuery=matchMedia('(max-width:760px)');
function setMenuState(open){
 open=Boolean(open)&&mobileMenuQuery.matches;
 navMenu.classList.toggle('active',open);hamburger.classList.toggle('active',open);
 hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?'Close menu':'Open menu');
 document.body.classList.toggle('menu-open',open);navMenu.inert=mobileMenuQuery.matches&&!open;
}
setMenuState(false);
mobileMenuQuery.addEventListener('change',()=>setMenuState(false));
hamburger.addEventListener('click',()=>setMenuState(hamburger.getAttribute('aria-expanded')!=='true'));
navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenuState(false)));
document.addEventListener('click',e=>{if(!e.target.closest('.navbar'))setMenuState(false)});
window.addEventListener('resize',()=>{if(innerWidth>760)setMenuState(false)});
const progress=document.getElementById('scroll-progress');
let scrollQueued=false;
function updateScroll(){const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=(total>0?scrollY/total*100:0)+'%';scrollQueued=false;}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
if('IntersectionObserver'in window){const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navMenu.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}})},{rootMargin:'-15% 0px -65% 0px',threshold:0});document.querySelectorAll('section[id]').forEach(s=>sectionObserver.observe(s));}
const lightbox=document.getElementById('lightbox'),lightboxImg=document.getElementById('lightbox-img'),closeBtn=document.querySelector('.close-lightbox');let previousFocus;
function closeLightbox(){lightbox.hidden=true;lightbox.classList.remove('active');document.body.classList.remove('modal-open');previousFocus?.focus();}
document.querySelectorAll('.lightbox-trigger').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();previousFocus=a;lightboxImg.src=a.href;lightboxImg.alt=a.querySelector('img')?.alt||'Recognition award';lightbox.hidden=false;lightbox.classList.add('active');document.body.classList.add('modal-open');closeBtn.focus()}));
closeBtn.addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!lightbox.hidden)closeLightbox();if(hamburger.getAttribute('aria-expanded')==='true'){setMenuState(false);hamburger.focus()}}if(e.key==='Tab'&&!lightbox.hidden){e.preventDefault();closeBtn.focus()}});
let statusTimer;function announce(message){clearTimeout(statusTimer);document.getElementById('action-status').textContent=message;statusTimer=setTimeout(()=>document.getElementById('action-status').textContent='',7000)}
/* Two deliberate A4 pages: selectable text, full-width reading order, no photo or skill bars.
   Keep factual content here in sync with the portfolio when updating experience. */
function generateCVPDF(){
 if(!window.jspdf?.jsPDF)throw new Error('The PDF library could not load. Please reload the page and try again.');
 const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'}),left=18,width=174;let y=20,compact=false;
 for(const style of ['normal','bold']){doc.addFileToVFS('CV-'+style+'.ttf',window.cvFonts[style]);doc.addFont('CV-'+style+'.ttf','CV',style);}
 doc.setProperties({title:'Oussama Malass - Curriculum Vitae',subject:'Web Application Security Researcher',author:'Oussama Malass',keywords:'web security, penetration testing, vulnerability research'});
 const ink=[19,30,49],muted=[77,87,105],accent=[35,86,193];
 function text(value,size=10,bold=false,color=ink){doc.setFont('CV',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...color);const lines=doc.splitTextToSize(value,width);doc.text(lines,left,y);y+=lines.length*size*.45+(compact ? .7 : 1.6);}
 function heading(value){y+=compact?2:3;doc.setDrawColor(199,210,230);doc.line(left,y,192,y);y+=6;text(value.toUpperCase(),10,true,accent);y+=1;}
 function item(title,meta){text(title,11,true);text(meta,9,false,muted);}
 function bullet(value){doc.setFont('CV','normal');doc.setFontSize(9.5);doc.setTextColor(...ink);const lines=doc.splitTextToSize(value,width-5);doc.text('-',left,y);doc.text(lines,left+5,y);y+=lines.length*4.3+(compact?1:2);}
 function link(label,url){doc.setFont('CV','normal');doc.setFontSize(9);doc.setTextColor(...accent);doc.textWithLink(label,left,y,{url});y+=5;}
 text('Oussama Malass',27,true);text('Web Application Security Researcher | Penetration Testing | Bug Bounty',10,false,accent);y+=1;
 text('Tripoli, Lebanon | Open to international opportunities',9,false,muted);
 text('+961 70 276 166 | malassouss@gmail.com',9,false,muted);
 link('ouss-m.github.io','https://ouss-m.github.io/');
 link('linkedin.com/in/oussama-malass','https://www.linkedin.com/in/oussama-malass/');
 link('hackerone.com/o-m','https://hackerone.com/o-m');
 heading('Profile');
 text('Computer Science graduate with hands-on web application security research experience since 2024. Focused on finding and validating vulnerabilities, explaining their impact, and providing clear reports that help engineering teams address security flaws.',10);
 heading('Security experience');
 item('Independent Vulnerability Researcher','Independent research via HackerOne | Apr 2024 - Present');
 bullet('Identified and responsibly disclosed web application vulnerabilities to organizations including Porsche, DoorDash, Deriv, and Krisp.');
 bullet('Test authentication, authorization, session management, and business logic for issues including IDOR, XSS, CSRF, and authentication bypass.');
 bullet('Investigate root causes and validate findings with reproducible proof-of-concept steps, impact assessments, and remediation guidance.');
 bullet('Use Burp Suite and OWASP Top 10 categories to guide testing of web applications and APIs, including injection, misconfiguration, and caching issues.');
 heading('Education');
 item('Bachelor of Science in Computer Science','Beirut Arab University (BAU) | Graduated 2026');
 text('Relevant coursework: Computer Networks, Operating Systems, Databases, Software Engineering, Data Structures, Web Development, and Cybersecurity Fundamentals.',9.5);
 heading('Technical skills');
 text('Security testing: Web and API testing, reconnaissance, access control, authentication, session management, business logic, and vulnerability validation.',9.5);
 text('Reporting: Proof-of-concept development, root cause analysis, impact assessment, and remediation guidance.',9.5);
 text('Tools and programming: Burp Suite, Python, JavaScript, SQL, C++, Linux, and Git.',9.5);
 doc.addPage();y=20;compact=true;text('Oussama Malass',17,true);text('Projects, practical training & recognition',10,false,muted);
 heading('Projects & research');
 item('AI-Assisted Security Research','Independent project | 2025 - Present');
 bullet('Explore AI-assisted approaches to reconnaissance and vulnerability discovery, keeping testing within agreed scope and protecting private data.');
 y+=2;
 item('Custom Security Tooling','Personal project | Ongoing');
 bullet('Develop Python tools for reconnaissance, request analysis, and web security testing, informed by open-source security projects.');
 heading('Practical training & certification');
 item('Web Penetration Testing','PentesterLab | 2024 - Present');
 bullet('Completed 150+ hands-on exercises covering web penetration testing, code review, and advanced exploitation techniques.');
 link('pentesterlab.com/profile/ouss','https://pentesterlab.com/profile/ouss');y+=3;
 item('Web Security Academy','PortSwigger | 2024 - Present');
 bullet('Completed 150+ practical labs covering SQL injection, XSS, CSRF, SSRF, XXE, access control, authentication, and business logic.');
 link('portswigger.net/web-security','https://portswigger.net/web-security');y+=3;
 item('Ethical Hacking Foundation','SemiColon Academy | April 2024 | 30 hours');
 bullet('Completed a practical program covering network security, penetration testing, and bug hunting fundamentals.');
 heading('Recognition');
 item('Bug Bounty Hunter Recognition Award','SemiColon | 2025');
 text('Recognized for vulnerability discovery on global platforms, including Porsche and DoorDash.',10);
 y+=2;
 text('Krisp publicly commended thorough research, clear communication, and solid findings on HackerOne (September 2026).',9);
 text('Earned HackerOne badges for identifying unique vulnerabilities and contributing validated reports to real-world security programs.',9);
 link('Verify public feedback and badges: hackerone.com/o-m','https://hackerone.com/o-m');
 heading('Languages');
 text('Arabic: Native  |  English: Professional  |  French: Intermediate',10);
 for(let p=1;p<=doc.getNumberOfPages();p++){doc.setPage(p);doc.setDrawColor(210,216,205);doc.line(left,281,192,281);doc.setTextColor(...muted);doc.setFont('CV','normal');doc.setFontSize(8);doc.text('Oussama Malass | Web Application Security',left,287);doc.text(`${p} / ${doc.getNumberOfPages()}`,192,287,{align:'right'});}
 return doc;
}
const cvButtons=document.querySelectorAll('#download-cv-btn,#hero-download-cv,#view-cv-btn');
cvButtons.forEach(btn=>btn.addEventListener('click',()=>{try{const doc=generateCVPDF();if(btn.id==='view-cv-btn'){const url=URL.createObjectURL(doc.output('blob'));const opened=window.open(url,'_blank');if(!opened){URL.revokeObjectURL(url);doc.save('Oussama_Malass_CV.pdf');announce('The preview was blocked, so your CV has been downloaded.');return}setTimeout(()=>URL.revokeObjectURL(url),120000);announce('CV opened in a new tab.')}else{doc.save('Oussama_Malass_CV.pdf');announce('Your CV is ready.')}}catch(error){announce(error.message||'Unable to generate your CV. Please try again.')}}));

/* Decorative motion is bounded, pauses off-screen, and respects OS preferences. */
(()=>{
 const media=matchMedia('(prefers-reduced-motion: reduce)'),toggle=document.getElementById('motion-toggle');
 let paused=media.matches,visible=true,frame=0,last=0,time=0;
 const hero=document.querySelector('.hero'),canvas=document.getElementById('network-canvas'),ctx=canvas.getContext('2d');let width=0,height=0,points=[];
 function resize(){width=hero.clientWidth;height=hero.clientHeight;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);points=Array.from({length:width<760?22:48},(_,i)=>({x:(Math.sin(i*19.13)*.5+.5)*width,y:(Math.cos(i*7.71)*.5+.5)*height,phase:i*2.4}));draw();}
 function draw(){ctx.clearRect(0,0,width,height);const nodes=points.map(p=>({x:p.x+Math.sin(time*.2+p.phase)*14,y:p.y+Math.cos(time*.15+p.phase)*16}));for(let i=0;i<nodes.length;i++){for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<145){ctx.strokeStyle=`rgba(67,123,215,${(1-d/145)*.14})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}ctx.fillStyle='rgba(57,118,218,.28)';ctx.beginPath();ctx.arc(nodes[i].x,nodes[i].y,1.7,0,Math.PI*2);ctx.fill();}}
 function tick(now){frame=0;if(paused||!visible||document.hidden)return;if(now-last>32){time+=.033;draw();last=now}frame=requestAnimationFrame(tick)}
 function sync(){document.body.classList.toggle('motion-paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Resume decorative animations':'Pause decorative animations');toggle.innerHTML=paused?'<span>▷</span> Motion':'<span>Ⅱ</span> Motion';cancelAnimationFrame(frame);frame=0;if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
 toggle.addEventListener('click',()=>{paused=!paused;sync()});media.addEventListener('change',e=>{paused=e.matches;sync()});document.addEventListener('visibilitychange',sync);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()}).observe(hero);
 new ResizeObserver(resize).observe(hero);
 if(!media.matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section-head,.about-grid,.timeline-item,.project-card,.skill-card,.edu-card,.award-card,.cv-block,.testimonial-card,.badge-card').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)})}
 document.querySelectorAll('.project-card').forEach(card=>card.addEventListener('pointermove',e=>{if(paused||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)}));
 const portrait=document.querySelector('[data-tilt]');portrait.addEventListener('pointermove',e=>{if(paused||e.pointerType!=='mouse')return;const r=portrait.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portrait.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg)`});portrait.addEventListener('pointerleave',()=>portrait.style.transform='');
 sync();
})();
