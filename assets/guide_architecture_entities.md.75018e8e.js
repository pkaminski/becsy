import{_ as s,c as a,a as t,b as e,r as o,o as p}from"./app.cd45da36.js";var c="/assets/entities.e7cdde26.svg";const f='{"title":"Entities","description":"","frontmatter":{},"headers":[{"level":2,"title":"Creating entities","slug":"creating-entities"},{"level":2,"title":"Adding components","slug":"adding-components"},{"level":2,"title":"Accessing and modifying components","slug":"accessing-and-modifying-components"},{"level":2,"title":"Removing components","slug":"removing-components"},{"level":2,"title":"Checking for components","slug":"checking-for-components"},{"level":2,"title":"Deleting entities","slug":"deleting-entities"},{"level":2,"title":"Holding on to entity objects","slug":"holding-on-to-entity-objects"}],"relativePath":"guide/architecture/entities.md","lastUpdated":1646465876000}',i={},l=e('<h1 id="entities" tabindex="-1">Entities <a class="header-anchor" href="#entities" aria-hidden="true">#</a></h1><p>An entity is an object that has a unique ID, very much like a JavaScript object. Its purpose is to group components together; it may have up to one component of each type.</p><p><img src="'+c+`" alt="Entities"></p><h2 id="creating-entities" tabindex="-1">Creating entities <a class="header-anchor" href="#creating-entities" aria-hidden="true">#</a></h2><p>You can create entities by invoking <code>createEntity</code> <a href="./world.html#creating-entities">on your world</a> or <a href="./systems.html#creating-entities">on a system</a>. You pass in the types of the components that you want the entity to start out with, each optionally followed by initial values to assign to the component&#39;s fields.</p><div class="language-js"><pre><code>world<span class="token punctuation">.</span><span class="token function">createEntity</span><span class="token punctuation">(</span>ComponentFoo<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">baz</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">}</span><span class="token punctuation">,</span> ComponentBar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-ts"><pre><code>world<span class="token punctuation">.</span><span class="token function">createEntity</span><span class="token punctuation">(</span>ComponentFoo<span class="token punctuation">,</span> <span class="token punctuation">{</span>foo<span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> baz<span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">}</span><span class="token punctuation">,</span> ComponentBar<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>It&#39;s also fine (if unusual) to create an entity with no components as a kind of placeholder.</p><h2 id="adding-components" tabindex="-1">Adding components <a class="header-anchor" href="#adding-components" aria-hidden="true">#</a></h2><p>Once an entity has been created, it is possible to add <a href="./components.html">components</a> to it at any time:</p><div class="language-ts"><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">component</span></span> <span class="token keyword">class</span> <span class="token class-name">ComponentA</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">field</span></span><span class="token punctuation">.</span>int32 <span class="token keyword">declare</span> value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">component</span></span> <span class="token keyword">class</span> <span class="token class-name">ComponentB</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">field</span></span><span class="token punctuation">.</span><span class="token function">dynamicString</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">declare</span> message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// in a system, given an entity:</span>
entity<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> <span class="token punctuation">{</span>value<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// or add multiple components at once:</span>
entity<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> <span class="token punctuation">{</span>value<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span> ComponentB<span class="token punctuation">,</span> <span class="token punctuation">{</span>message<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">class</span> <span class="token class-name">ComponentA</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> schema <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> Type<span class="token punctuation">.</span>int32
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ComponentB</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> schema <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span> Type<span class="token punctuation">.</span><span class="token function">dynamicString</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// in a system, given an entity:</span>
entity<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// or add multiple components at once:</span>
entity<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span> ComponentB<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The arguments to <code>add</code> and <code>addAll</code> are the same as those to <code>createEntity</code> above.</p><p>Trying to add the same component type to an entity more than once will result in an error.</p><h2 id="accessing-and-modifying-components" tabindex="-1">Accessing and modifying components <a class="header-anchor" href="#accessing-and-modifying-components" aria-hidden="true">#</a></h2><p>Components can be accessed from an entity in two ways:</p><ul><li><code>read(Component)</code>: get the component for read-only operations. (Attempts to set field values will throw an error unless you&#39;re running in <a href="./../deploying.html">performance mode</a>.)</li><li><code>write(Component)</code>: get the component to modify its field values.</li></ul><div class="language-ts"><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">component</span></span> <span class="token keyword">class</span> <span class="token class-name">ComponentA</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">field</span></span><span class="token punctuation">.</span>int32 <span class="token keyword">declare</span> value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">component</span></span> <span class="token keyword">class</span> <span class="token class-name">ComponentB</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">field</span></span><span class="token punctuation">.</span>int32 <span class="token keyword">declare</span> value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// in a system, given an entity:</span>
entity<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">.</span>value <span class="token operator">+=</span> entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>ComponentB<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">class</span> <span class="token class-name">ComponentA</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> schema <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> Type<span class="token punctuation">.</span>int32
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ComponentB</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> schema <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> Type<span class="token punctuation">.</span>int32
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// in a system, given an entity:</span>
entity<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">.</span>value <span class="token operator">+=</span> entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>ComponentB<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
</code></pre></div><div class="danger custom-block"><p class="custom-block-title">WARNING</p><p>You must not hang on to the component handles returned by <code>read</code> and <code>write</code>, as they&#39;ll be invalidated by the next call to <code>read</code> or <code>write</code> on the same component type.</p></div><p>These two access modes help to implement <a href="./queries.html#reactive-queries">reactive queries</a> with minimal overhead, allowing your systems to easily get lists of entities whose components have been mutated. Note that the component will get marked as changed even if you don&#39;t change any fields, so try to use <code>write</code> only when you know you will actually modify the component and use <code>read</code> otherwise.</p><p>Keeping these two modes distinct also makes it clear how a system is acting on components, and allows Becsy&#39;s scheduler to automatically parallelize system execution without needing to use expensive and error-prone locks.</p><h2 id="removing-components" tabindex="-1">Removing components <a class="header-anchor" href="#removing-components" aria-hidden="true">#</a></h2><p>Another common operation on entities is to remove components:</p><div class="language-ts"><pre><code>entity<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code>entity<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Trying to remove a component that an entity doesn&#39;t have will result in an error.</p><p>Removing a component makes it disappear from the entity immediately, but Becsy actually keeps it around until the end of the next frame. This is done so that every system that needs to react to the removal gets a chance to access the data of removed components. You can access recently removed components like this:</p><div class="language-ts"><div class="highlight-lines"><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br></div><pre><code>world<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>sys <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> entity <span class="token operator">=</span> sys<span class="token punctuation">.</span><span class="token function">createEntity</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> <span class="token punctuation">{</span>value<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>  <span class="token comment">// 10</span>
  entity<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// entity.read(ComponentA).value;  // error!</span>
  sys<span class="token punctuation">.</span><span class="token function">accessRecentlyDeletedData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>  <span class="token comment">// 10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br></div><pre><code>world<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token parameter">sys</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> entity <span class="token operator">=</span> sys<span class="token punctuation">.</span><span class="token function">createEntity</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>  <span class="token comment">// 10</span>
  entity<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// entity.read(ComponentA).value;  // error!</span>
  sys<span class="token punctuation">.</span><span class="token function">accessRecentlyDeletedData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>  <span class="token comment">// 10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>However you cannot write to recently deleted components.</p><h2 id="checking-for-components" tabindex="-1">Checking for components <a class="header-anchor" href="#checking-for-components" aria-hidden="true">#</a></h2><p>While normally you&#39;ll use <a href="./queries.html">queries</a> to select entities with the desired combination of components, sometimes you&#39;ll need to check explicitly whether an entity has a component or not. This is useful when writing <a href="./components.html#validation">validators</a> but can also be used to check whether a component needs to be added or removed.</p><p>There are a few methods available for these checks:</p><div class="language-ts"><pre><code>entity<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">hasSomeOf</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity <span class="token function">hasAllOf</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">hasAnyOtherThan</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">countHas</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">,</span> ComponentC<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code>entity<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">hasSomeOf</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity <span class="token function">hasAllOf</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">hasAnyOtherThan</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">)</span><span class="token punctuation">;</span>
entity<span class="token punctuation">.</span><span class="token function">countHas</span><span class="token punctuation">(</span>ComponentA<span class="token punctuation">,</span> ComponentB<span class="token punctuation">,</span> ComponentC<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>All these methods respects <code>System.accessRecentlyDeletedData()</code>, in case you need to check whether a component was recently removed, but <a href="./queries.html#reactive-queries">reactive queries</a> are usually better for this.</p><h2 id="deleting-entities" tabindex="-1">Deleting entities <a class="header-anchor" href="#deleting-entities" aria-hidden="true">#</a></h2><p>Unlike JavaScript objects, which are automatically disposed of when they&#39;re no longer referenced, entities must be explicitly deleted like so:</p><div class="language-ts"><pre><code>entity<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code>entity<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Doing so will remove all components from the entity (triggering relevant <a href="./queries.html#reactive-queries">reactive queries</a>) then delete the entity itself.</p><p>Deleting an entity that has already been deleted will result in an error.</p><h2 id="holding-on-to-entity-objects" tabindex="-1">Holding on to entity objects <a class="header-anchor" href="#holding-on-to-entity-objects" aria-hidden="true">#</a></h2><p>The entity objects returned from <code>createEntity</code> or obtained from <a href="./queries.html">queries</a> are ephemeral: they are only guaranteed to remain valid until the system finishes executing. Afterwards, they may be invalidated at any time even if the entity has not yet been deleted. (It&#39;s fine to assign these ephemeral entities to a <code>ref</code> field, though, as it keeps track of the underlying entity directly.)</p><p>To keep an entity object for longer you need to &quot;hold&quot; it:</p><div class="language-ts"><div class="highlight-lines"><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br></div><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">system</span></span> <span class="token keyword">class</span> <span class="token class-name">MySystem</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> myImportantEntity<span class="token operator">:</span> Entity<span class="token punctuation">;</span>

  <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newEntity <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createEntity</span><span class="token punctuation">(</span>Foo<span class="token punctuation">,</span> Bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myImportantEntity <span class="token operator">=</span> newEntity<span class="token punctuation">.</span><span class="token function">hold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myImportantEntity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// OK!</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">class</span> <span class="token class-name">MySystem</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newEntity <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createEntity</span><span class="token punctuation">(</span>Foo<span class="token punctuation">,</span> Bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myImportantEntity <span class="token operator">=</span> newEntity<span class="token punctuation">.</span><span class="token function">hold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myImportantEntity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// OK!</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>A held entity handle becomes invalid shortly after the underlying entity has been deleted, at which point trying to call any method on it will result in an error. If the lifecycle of an entity held by a system is outside its control then you should check <code>entity.alive</code> every frame and stop referencing the entity once it becomes <code>false</code>. You&#39;re guaranteed at least one frame where <code>entity.alive</code> is <code>false</code> and the handle is still valid, but if you miss the opportunity you&#39;re out of luck.</p>`,49);function u(r,k,d,m,y,h){const n=o("language-switcher");return p(),a("div",null,[t(n),l])}var v=s(i,[["render",u]]);export{f as __pageData,v as default};
